import { Ok,Err,OkImpl } from 'ts-results';
import { INestApplication } from '@nestjs/common';
import { CmdHandler} from '../src/twitch-bot/cmd-handler';
import {UserError} from "../src/shared/error"
import {UnauthorizedError} from "../src/twitch-bot/auth"
import {TwitchRallyCommand} from "../src/twitch-bot/rally/commands"
import * as http from "../src/shared/http"

import {mockCmdHandlerParams} from "./utilities"

describe('TwitchBot Rally Commands [e2e]', () => {
	let cmdHandler: CmdHandler;
	beforeAll(async ()=>{
		const mockInfoCommand=jest.fn()
		cmdHandler = new CmdHandler(new mockInfoCommand,new TwitchRallyCommand())
	});
	afterEach(()=>{
		jest.clearAllMocks()
	})

	it(TwitchRallyCommand.getCoinCountCmd,async()=>{
		jest.spyOn(http, "fetchJson").mockResolvedValueOnce(
			Ok({totalCoins:"123456789"})
		)
		const res=await cmdHandler.executeCmd(
			...mockCmdHandlerParams([TwitchRallyCommand.getCoinCountCmd,"coin"],{})
		)
		expect(res).toEqual(Ok("123456789"))
	})
})
