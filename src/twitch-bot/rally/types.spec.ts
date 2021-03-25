import {Ok,OkImpl} from "ts-results"
import {Balance,BalanceLine} from "./types"

describe("BalanceLine",()=>{
	it("should create from json",async()=>{
		const blWrap=await BalanceLine.createFromJson({
			"coinKind":"STANZ","coinBalance":"1234","estimatedInUsd":"1234"
		})

		expect(blWrap).toBeInstanceOf(OkImpl)
		const bl=blWrap.unwrap()
		expect(bl.coinKind).toEqual("STANZ")
		expect(bl.coinBalance).toEqual("1234")
		expect(bl.estimatedInUsd).toEqual("1234")
	})
})
describe("Balance",()=>{
	afterEach(()=>{
		jest.clearAllMocks()
	})
	it("should create from json",async()=>{
		jest.spyOn(BalanceLine,"createFromJson").mockImplementation((json:any)=>
		{
			const obj={
				coinKind:json.coinKind,
				coinBalance:json.coinBalance,
				estimatedInUsd:json.estimatedInUsd
			}
			return Promise.resolve(Ok(obj))
		})

		const balanceWrap=await Balance.createFromJson([
			{ "coinKind":"1","coinBalance":"1","estimatedInUsd":"1" },
			{ "coinKind":"2","coinBalance":"2","estimatedInUsd":"2" },
			{ "coinKind":"3","coinBalance":"3","estimatedInUsd":"3" },
		])

		expect(balanceWrap).toBeInstanceOf(OkImpl)
		const balance=balanceWrap.unwrap()
		expect(balance.balance.length).toBe(3)
		expect(balance.balance).toEqual([
			{ "coinKind":"1","coinBalance":"1","estimatedInUsd":"1" },
			{ "coinKind":"2","coinBalance":"2","estimatedInUsd":"2" },
			{ "coinKind":"3","coinBalance":"3","estimatedInUsd":"3" },
		])
	})
})
