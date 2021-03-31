jest.mock("node-fetch")
import { Ok,Err } from 'ts-results';
import { CmdHandler} from '../src/twitch-bot/cmd-handler';
import {TwitchRallyCommand} from "../src/twitch-bot/rally/commands"

import {
	mockCmdParams,
	mFetch,
	mockFetchResult
} from "./utilities"

describe('TwitchBot Rally Commands [e2e]', () => {
	let cmdHandler: CmdHandler;
	beforeAll(async ()=>{
		const mockClass=jest.fn()
		cmdHandler = new CmdHandler(new mockClass,new TwitchRallyCommand(),new mockClass)
	});
	afterEach(()=>{
		jest.clearAllMocks()
	})

	describe(TwitchRallyCommand.getCoinCountCmd,()=>{
		it("it should get coin count",async()=>{
			mFetch.default
			.mockResolvedValueOnce(mockFetchResult(
				{totalCoins:123}
			))
			const res=await cmdHandler.cmdSwitch(
				...mockCmdParams(
					[TwitchRallyCommand.getCoinCountCmd,"coin"],{}
				)
			)
			expect(res).toEqual(Ok("123"))
		})
	})
	describe(TwitchRallyCommand.getCreatorCoinTransactionsCmd,()=>{
		it("it should get total transaction",async ()=>{
			mFetch.default
			.mockResolvedValueOnce(mockFetchResult(
				{totalTransaction:123}
			))
			const res=await cmdHandler.cmdSwitch(
				...mockCmdParams([TwitchRallyCommand.getCreatorCoinTransactionsCmd,"coin"],{})
			)
			expect(res).toEqual(Ok("123"))
		})
	})
	describe(TwitchRallyCommand.getUserBalanceCmd,()=>{
		it("should get user balance",async ()=>{
			const mockRes=
				[
					{"coinKind":"RLY","coinBalance":"2.520225","estimatedInUsd":"0.735704082"},
					{"coinKind":"FAN","coinBalance":"0.02","estimatedInUsd":"0.0452600124384"},
					{"coinKind":"STANZ","coinBalance":"7.5","estimatedInUsd":"6.5819034546"}
				]
			mFetch.default
			.mockResolvedValueOnce(mockFetchResult(
				mockRes
			))
			const res=await cmdHandler.cmdSwitch(
				...mockCmdParams([TwitchRallyCommand.getUserBalanceCmd,"ID"],{})
			)
			//expect(res.val[0]).toEqual(mockRes[0])
			expect(res.val.balance).toEqual(mockRes)
		})
	})
	describe(TwitchRallyCommand.getCoinPrice,()=>{
		it("should get coin price",async ()=>{
			const fetchRes={symbol:"coin",priceInUSD:"123",priceInRLY:"123"}
			mFetch.default
			.mockResolvedValueOnce(mockFetchResult(fetchRes))
			const res=await cmdHandler.cmdSwitch(
				...mockCmdParams([TwitchRallyCommand.getCoinPrice,"coin"],{})
			)
			//expect(res.val[0]).toEqual(mockRes[0])
			expect(res.val.priceInRLY).toBe("123")
			expect(res.val.priceInUSD).toBe("123")
			expect(res.val.symbol).toBe("coin")
		})
	})
})
