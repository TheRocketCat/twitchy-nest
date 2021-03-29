import {Result,Ok,Err} from "ts-results"
import {TwitchRallyCommand} from "./commands"
import * as http from "../../shared/http"
import {CreatorCoinPrice} from "./types"
import {OWNED_CHANNEL, USERSTATE} from "../../../test/utilities"

describe("TwitchRallyCommand",()=>{
	const TRC=new TwitchRallyCommand()
	afterEach(()=>{
		jest.clearAllMocks()
	})
	describe("getCoinCount",()=>{
		it("should get total coins",async()=>{
			jest.spyOn(http, "fetchJsonProperty").mockResolvedValueOnce(
				Ok("123456789")
			)
			const res=await TRC.getCoinCount(OWNED_CHANNEL,USERSTATE,["coin"])
			expect(res).toEqual(Ok("123456789"))
		})
	})
	describe("getCoinTransactionVolume",()=>{
		it("should get transaction volume",async()=>{
			jest.spyOn(http, "fetchJsonProperty").mockResolvedValueOnce(
				Ok("123456789")
			)
			const res=await TRC.getCoinTransactionVolume(
				OWNED_CHANNEL,
				USERSTATE,
				["coin"]
			)
			expect(res).toEqual(Ok("123456789"))
		})
	})
	describe("getCoinTransactionVolume",()=>{
		it("should get transaction volume",async()=>{
			jest.spyOn(http, "fetchJsonProperty").mockResolvedValueOnce(
				Ok("123456789")
			)
			const res=await TRC.getCoinTransactionVolume(
				OWNED_CHANNEL,
				USERSTATE,
				["coin"]
			)
			expect(res).toEqual(Ok("123456789"))
		})
	})
	describe("getCoinPrice",()=>{
		it("should get coin price",async()=>{
			jest.spyOn(http, "fetchJson").mockResolvedValueOnce(
				Ok({
					"symbol":"TROLL",
					"priceInUSD": 123456789,
					"priceInRLY": 123456789
				})
			)
			//this is reasonably close to what CreatorCoinPrice is
			jest.spyOn(CreatorCoinPrice, "createFromJson").mockImplementation(()=>{
					return Promise.resolve(Ok({
						"symbol":"TROLL",
						"priceInUSD": 123456789,
						"priceInRLY": 123456789
					}))
				}
			)

			const res=(await TRC.getCoinPrice(
				OWNED_CHANNEL,USERSTATE,["coin"]
			)).unwrap()
			expect(res.symbol).toEqual("TROLL")
			expect(res.priceInUSD).toEqual(123456789)
			expect(res.priceInRLY).toEqual(123456789)
		})
	})
	describe("getUserBalance",()=>{
		it("should return user balance",async()=>{
			jest.spyOn(http, "fetchJson").mockResolvedValueOnce(
				Ok([
					{"coinKind":"RLY","coinBalance":"2.520225","estimatedInUsd":"0.735704082"},
					{"coinKind":"FAN","coinBalance":"0.02","estimatedInUsd":"0.0452600124384"},
					{"coinKind":"STANZ","coinBalance":"7.5","estimatedInUsd":"6.5819034546"}
					])
			)
			//jest.spyOn(, "fetchJson").mockResolvedValueOnce(
			//)
			const balance=(await TRC.getUserBalance(
				OWNED_CHANNEL,USERSTATE,["mock user id"]
			)).unwrap()
			expect(balance.balance.length).toBe(3)
			expect(balance.balance[0])
				.toEqual({"coinKind":"RLY","coinBalance":"2.520225","estimatedInUsd":"0.735704082"})
			expect(balance.balance[1])
				.toEqual( {"coinKind":"FAN","coinBalance":"0.02","estimatedInUsd":"0.0452600124384"})
			expect(balance.balance[2])
				.toEqual( {"coinKind":"STANZ","coinBalance":"7.5","estimatedInUsd":"6.5819034546"})
		})
	})
})
