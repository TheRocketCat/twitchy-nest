import { Ok,Err,OkImpl } from 'ts-results';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { InfoCommandModule } from '../src/info-command/info-command.module';
import { TwitchInfoCommand } from '../src/twitch-bot/info-command/info-command';
import { CmdHandler} from '../src/twitch-bot/cmd-handler';
import {UserError} from "../src/shared/error"
import {UnauthorizedError} from "../src/twitch-bot/auth"
import {rootMongooseTestModule,closeInMongodConnection} from "../src/shared/testing/mongo-in-memory-db.module"
import {InfoCommandService} from "../src/info-command/info-command.service"
import {
	mockCmdParams,
	NOT_OWNER_USERSTATE,
	USERSTATE,
	OWNED_CHANNEL,
	NOT_OWNED_CHANNEL
} from "./utilities"

describe('TwitchBot InfoCommand [e2e]', () => {
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

		const infoCmdService = app.get(InfoCommandService);

		const mockClass=jest.fn()
		cmdHandler = new CmdHandler(
			new TwitchInfoCommand(infoCmdService),
			new mockClass,
			new mockClass
		)
	});
	afterAll(async () => {
		await closeInMongodConnection()
		await app.close();
	});

	describe(TwitchInfoCommand.createCmd,()=>{
		it('should create new info command', async () => {
			/*
			const msg = `!${TwitchInfoCommand.createCmd} ${NEW_INFO_CMD} ${INFO_UNPROCESSED}`;
			const res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);
			*/

			const res = await cmdHandler.cmdSwitch(...mockCmdParams(
					[TwitchInfoCommand.createCmd,NEW_INFO_CMD,INFO_UNPROCESSED]
					,{}
				));

			expect(res).toBe(Ok.EMPTY);
		});
		it('should only create on your channel', async () => {
			const res = await cmdHandler.cmdSwitch(...mockCmdParams(
					[TwitchInfoCommand.createCmd,NEW_INFO_CMD,INFO_UNPROCESSED]
					,{userstate:NOT_OWNER_USERSTATE}
				));

			expect(res).toEqual(Err(new UnauthorizedError()))
		});
	})
	describe("get custom info commands",()=>{
		it("should get recently created info cmd info",async()=>{
			/*
			const msg = `!${NEW_INFO_CMD}`;
			const res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);
			*/
			const res = await cmdHandler.cmdSwitch(...mockCmdParams(
					[`${NEW_INFO_CMD}`] ,{}
				));
			expect(res.unwrap()).toEqual(INFO_PROCESSED)
		})
	})

	describe(TwitchInfoCommand.updateInfoCmd,()=>{
		it("change cmd info",async()=>{
			const newInfoProcessed="this is the new information"
			const newInfoUnProcessed= "\"" + newInfoProcessed + "\""
			let msg = `!${TwitchInfoCommand.updateInfoCmd} ${NEW_INFO_CMD} ${newInfoUnProcessed}`;
			let res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);
			expect(res).toEqual(Ok.EMPTY)

			msg = `!${NEW_INFO_CMD}`
			res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);
			expect(res.unwrap()).toEqual(newInfoProcessed)
		})
	})

	describe(TwitchInfoCommand.deleteCmd,()=>{
		it("should not delete info cmd",async()=>{
			let msg = `!${TwitchInfoCommand.deleteCmd} ${NEW_INFO_CMD}`;
			let res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				{username:"hackerdude"},
				msg,
				false,
			);
			expect(res).toEqual(Err(new UnauthorizedError()))

			msg = `!${NEW_INFO_CMD}`
			res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);

			expect(res).toBeInstanceOf(OkImpl)
		})
		it("should delete info cmd",async()=>{
			let msg = `!${TwitchInfoCommand.deleteCmd} ${NEW_INFO_CMD}`;
			let res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);
			expect(res).toEqual(Ok.EMPTY)

			msg = `!${NEW_INFO_CMD}`
			res = await cmdHandler.executeCmd(
				OWNED_CHANNEL,
				USERSTATE,
				msg,
				false,
			);

			expect(res).toEqual(Err(new UserError("no such command")))
		})
	})
});
