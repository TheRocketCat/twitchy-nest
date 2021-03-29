import {
    Result ,Ok ,Err
    ,Option ,Some ,None
} from "ts-results"
import {UserError} from "../../shared/error"
import {fetchJson,fetchJsonProperty} from "../../shared/http"
import {CreatorCoinPrice,Balance} from "./types"
import {TwitchCmd} from "../cmd-decorator"
import {Userstate} from "tmi.js"

const RALLY_API="https://api.rally.io/v1"

export class TwitchRallyCommand{

	static readonly getCoinCountCmd="coinCount"
	static readonly getCreatorCoinTransactionsCmd="creatorTransactions"
	static readonly getUserBalanceCmd="userBalance"
	static readonly getCoinPrice="coinPrice"

	@TwitchCmd(TwitchRallyCommand.getCoinCountCmd)
	async getCoinCount(channel:string,us:Userstate,[coin]:string[])
	:Promise<Result<string,Error>>{
		if(coin == undefined){
			return Err(new UserError("no coin symbol given"))
		}
		try{
			const totalCoins=(
				await fetchJsonProperty(
					`${RALLY_API}/creator_coins/${coin}/summary`
					,"totalCoins"
				)
			).expect("get coin count");
			return Ok(String(totalCoins))
		}catch(e){
			return Err(e)
		}
	}

	@TwitchCmd(TwitchRallyCommand.getCreatorCoinTransactionsCmd)
	async getCoinTransactionVolume(channel:string,us:Userstate, [coin]:string[])
	:Promise<Result<string,Error>>
	{
		if(coin == undefined){
			return Err(new UserError("no coin symbol given"))
		}
		try{
			//TODO suppoer other idType - check docs
			const totalTransaction=(await fetchJsonProperty(
				`${RALLY_API}/creator_coins/${coin}/summary`,
				"totalTransaction"
			)).expect("get coin transaction volume");

			return Ok(String(totalTransaction))
		}catch(e){
			return Err(e)
		}
	}

	@TwitchCmd(TwitchRallyCommand.getCoinPrice)
	async getCoinPrice(channel:string,us:Userstate,[coinSymbol]:string[])
	:Promise<Result<CreatorCoinPrice,Error>>{
		try{
			const json=(await fetchJson(`${RALLY_API}/creator_coins/${coinSymbol}/price`)
		   ).expect("get coin price");

			const CCP=(await CreatorCoinPrice.createFromJson(json))
				.expect("invalid data from api")

			return Ok(CCP)
		}catch(e){
			return Err(e)
		}
	}

	@TwitchCmd(TwitchRallyCommand.getUserBalanceCmd)
	async getUserBalance(channel:string,us:Userstate, [id]:string[]){
		try{
			//TODO suppoer other idType - check docs
			const json=(await fetchJson(`${RALLY_API}/users/rally/${id}/balance`))
				.expect("fetch json");

			const balance=(await Balance.createFromJson(json))
				.expect("creating balance");
			return Ok(balance)
		}catch(e){
			return Err(e)
		}
	}
}
