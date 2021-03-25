import {
    Result ,Ok ,Err
    ,Option ,Some ,None
} from "ts-results"
import {UserError} from "../../shared/error"
import {fetchJson} from "../../shared/http"

const RALLY_API="https://api.rally.io/v1"


export class TwitchRallyCommand{
	static readonly getCoinCountCmd="coinCount"

	async getCoinCount([coin]:string[])
	:Promise<Result<string,Error>>{
		if(coin == undefined){
			return Err(new UserError("no coin symbol given"))
		}
		try{
			const json=(
				await fetchJson(
					`${RALLY_API}/creator_coins/${coin}/summary`
				)
			).expect("get coin count");

			if(json.totalCoins == undefined){
				return Err(new Error("api is not working correctly"))
			}
			//const nmbr=<number>Joi.attempt(json.totalCoins,Joi.number().required())
			return Ok(String(json.totalCoins))
		}catch(e){
			return Err(e)
		}
	}
	/*
	async getCoinPrice(msg:string)
	:Promise<Result<CreatorCoinPrice,Error>>{
		if(args[1] != undefined){
			return getCoinPrice(args[1])
		}else{
			return getDefaultCoinPrice()
		}
	}

	async getBalance(msg:string)
	:Promise<Result<Balance,Error>>{
		if(args.length != 2){
			return Err(new WrongAmountOfArgsError())
		}

		try { Joi.assert(args[1], Joi.string()) }
		catch(e){return Err(e)}

		return getBalance(args[1])
	}
	*/
}
