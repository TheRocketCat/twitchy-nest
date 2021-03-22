import * as dotenv from 'dotenv';
import * as tmi from 'tmi.js';
import { NestFactory } from '@nestjs/core';
import {Result,Ok} from "ts-results"
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { CmdHandler } from './twitch-bot/cmd-handler';
import { InfoCommandService } from './info-command/info-command.service';
import { InfoCommandController } from './info-command/info-command.controller';
import { TwitchInfoCommand } from './twitch-bot/info-command/info-command';
import { ValidationPipe } from '@nestjs/common';

//import {TwitchClient} from "./twitch-bot/client.service";
dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.useGlobalPipes(
		new ValidationPipe({
			//disableErrorMessages: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Twitchy Rally Bot')
		.setDescription('a twitch bot for Rally Creators')
		.setVersion('0.0.26')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);

	const infoCmdService = app.get(InfoCommandService);

	const cmdHandler = new CmdHandler(
		//twitchInfoCmd
		new TwitchInfoCommand(infoCmdService),
	);
	//cmdHandler.executeCmd("x",{},"y",true)

	//TODO check so tokens dont have OAUTH at beginning ?
	const opts = {
		options: {
			//clientId:"zmsxkjz11ag8a7mq7hdfg3gjg2vi6d"
		},
		connection: {
			secure: true,
		},
		identity: {
			username: 'darockecat',
			password: process.env.OAUTH,
		},
		channels: ['darockecat'],
	};

	const twitchClient = new tmi.Client(opts);
	twitchClient.once('connected', function (adr, port) {
		console.log('twitch client running');
	});
	twitchClient.on(
		'message',
		async function (
			channel: string,
			userstate: tmi.Userstate,
			msg: string,
			self: boolean,
		) {
			if (msg.charAt(0) != '!') return;
			//idk if this works properly, username type isnt specified
			else if (userstate.username == undefined) {
				return;
			}
			const cmdResult = await cmdHandler.executeCmd(channel, userstate, msg, self);
			writeResultMessage(twitchClient,channel,cmdResult)
		},
	);
	await twitchClient.connect();
}
bootstrap();

function writeResultMessage(client:tmi.Client,channel:string,resMsg:Result<any,Error>):void
{
	if(resMsg.err == true){
		client.say(channel,"command failed")
		return
	}else if(resMsg == Ok.EMPTY){
		client.say(channel,"success")
	}else{
		//TODO idk how well this work
		client.say(channel,String(resMsg.val))
	}
}
