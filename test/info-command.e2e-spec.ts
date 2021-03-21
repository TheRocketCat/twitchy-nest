import { Ok,Err,OkImpl } from 'ts-results';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from "mongoose"
import { INestApplication } from '@nestjs/common';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { InfoCommandModule } from '../src/info-command/info-command.module';
import { TwitchInfoCommand } from '../src/twitch-bot/info-command/info-command';
import { InfoCommandService } from '../src/info-command/info-command.service';
import { CmdHandler } from '../src/twitch-bot/cmd-handler';
import {UnauthorizedError} from "../src/twitch-bot/auth"
import {rootMongooseTestModule,closeInMongodConnection} from "../src/shared/testing/mongo-in-memory-db.module"

describe('TwitchBot InfoCommand', () => {
	const USERSTATE = {
		username: 'username',
	};
	const OWNED_CHANNEL = '#' + USERSTATE.username;
	const NOT_OWNED_CHANNEL = '#notownedchannel';
	const NEW_INFO_CMD="newCmd"
	const INFO_PROCESSED="this information will print"
	const INFO_UNPROCESSED = '"' + INFO_PROCESSED + '"'

	let app: INestApplication;
	let cmdHandler: CmdHandler;
	beforeAll(async function() {
		const moduleRef = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				//MongooseModule.forRoot('mongodb://localhost/twitchy_test'),
				InfoCommandModule,
			],
		}).compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(
			new FastifyAdapter(),
		);
		await app.init();
		//dbCon=app.get("DB_CONNECTION")

		const infoCmdService = app.get(InfoCommandService);
		cmdHandler = new CmdHandler(new TwitchInfoCommand(infoCmdService));
	});

	describe('!createInfoCmd',()=>{
		it('should create new info command', async () => {
			const msg = `!createInfoCmd ${NEW_INFO_CMD} ${INFO_UNPROCESSED}`;
			const res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);

			expect(res).toBe(Ok.EMPTY);
		});
		it('should only create on your channel', async () => {
			const msg = `!createInfoCmd ${NEW_INFO_CMD} ${INFO_UNPROCESSED}`;
			const res = await cmdHandler.executeCmd(
				NOT_OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);

			expect(res).toEqual(Err(new UnauthorizedError()))
		});
	})

	describe("custom info commands",()=>{
		it("should get recently created info cmd info",async()=>{
			const msg = `!${NEW_INFO_CMD}`;
			const res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);
			expect(res).toBeInstanceOf(OkImpl)
			expect(res.unwrap().info).toEqual(INFO_PROCESSED)
		})
	})


	afterAll(async () => {
		await closeInMongodConnection()
		await app.close();
	});
});
