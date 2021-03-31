import { Ok,Err } from 'ts-results';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AutoCommandModule } from '../src/auto-command/auto-command.module';
import { TwitchAutoCommand } from '../src/twitch-bot/auto-command/commands';
import { CmdHandler,standardCmdHandlerSetup } from '../src/twitch-bot/cmd-handler';
import { AutoCommandService } from '../src/auto-command/auto-command.service';
import {UserError} from "../src/shared/error"
import {UnauthorizedError} from "../src/twitch-bot/auth"
import {rootMongooseTestModule,closeInMongodConnection} from "../src/shared/testing/mongo-in-memory-db.module"
import {
	mockCmdParams,
	NOT_OWNER_USERSTATE,
	USERSTATE,
	OWNED_CHANNEL,
	NOT_OWNED_CHANNEL
} from "./utilities"

describe('TwitchBot AutoCommand [e2e]', () => {
	const NEW_AUTO_NAME="myAutoCmd"
	const AUTO_PROCESSED="this autormation will print"
	const AUTO_UNPROCESSED = '"' + AUTO_PROCESSED + '"'

	let app: INestApplication;
	let cmdHandler: CmdHandler;
	beforeAll(async function() {
		const moduleRef = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				//MongooseModule.forRoot('mongodb://localhost/twitchy_test'),
				AutoCommandModule,
			],
		}).compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(
			new FastifyAdapter(),
		);
		const autoCmdService = app.get(AutoCommandService);

		const mockClass=jest.fn()
		cmdHandler = new CmdHandler(
			new mockClass ,
			new mockClass,
			new TwitchAutoCommand(autoCmdService)
		)
	});
	afterAll(async () => {
		await closeInMongodConnection()
		await app.close();
	});

	describe(TwitchAutoCommand.createCmd,()=>{
		it('should create new auto command', async () => {
			const res = await cmdHandler.cmdSwitch(...mockCmdParams(
					[TwitchAutoCommand.createCmd,NEW_AUTO_NAME,AUTO_UNPROCESSED,"5"]
					,{}
				));

			expect(res).toBe(Ok.EMPTY);
		});
	})
});
