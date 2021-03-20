import { Ok } from 'ts-results';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { InfoCommandModule } from '../src/info-command/info-command.module';
import { AppModule } from '../src/app.module';
import { TwitchInfoCommand } from '../src/twitch-bot/info-command/info-command';
import { InfoCommandService } from '../src/info-command/info-command.service';
import { CmdHandler } from '../src/twitch-bot/cmd-handler';

describe('TwitchBot InfoCommand', () => {
	const USERSTATE = {
		username: 'username',
	};
	const OWNED_CHANNEL = '#' + USERSTATE.username;
	const NOT_OWNED_CHANNEL = '#notownedchannel';

	let app: INestApplication;
	let cmdHandler: CmdHandler;
	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				MongooseModule.forRoot('mongodb://localhost/twitchy_test'),
				InfoCommandModule,
			],
		}).compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(
			new FastifyAdapter(),
		);
		await app.init();

		const infoCmdService = app.get(InfoCommandService);
		cmdHandler = new CmdHandler(new TwitchInfoCommand(infoCmdService));
	});

	it('create', async () => {
		const cmd = 'newCmd';
		const info = '"new information to print"';
		const msg = `!createInfoCmd ${cmd} ${info}`;
		const res = await cmdHandler.executeCmd(
			OWNED_CHANNEL,
			USERSTATE,
			msg,
			false,
		);

		expect(res).toBe(Ok.EMPTY);
	});

	afterAll(async () => {
		//TODO delete database
		await app.close();
	});
});
