import {
    Result ,Ok ,Err
    ,Option ,Some ,None
} from "ts-results"

import { validate, ValidationError } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

import {IToString} from "../shared/interfaces/string"

export class CreatorCoinPrice implements IToString{
	@IsNotEmpty()
    readonly symbol:string
	@IsNotEmpty()
    readonly priceInUSD:number
	@IsNotEmpty()
    readonly priceInRLY:number

    private constructor(symbol:string,priceInUSD:number,priceInRLY:number){
        this.symbol=symbol
        this.priceInUSD=priceInUSD
        this.priceInRLY=priceInRLY
    }

    static async createFromJson(json:any)
	:Promise<Result<CreatorCoinPrice,ValidationError[]>>{
		const CCP=new CreatorCoinPrice(json.symbol,json.priceInUSD,json.priceInRLY)

		const errors = await validate(CCP);
		if (errors.length > 0) return Err(errors);

        return Ok(CCP)
    }

    toString():string{
        return `${this.symbol}: ${this.priceInUSD} USD or ${this.priceInRLY} RLY`
    }
}

export class BalanceLine{
	@IsNotEmpty()
    readonly coinKind:string
	@IsNotEmpty()
    readonly coinBalance:string
	@IsNotEmpty()
    readonly estimatedInUsd:string
	private constructor(coinKind:string,coinBalance:string,estimatedInUsd:string){
		this.coinKind=coinKind
		this.coinBalance=coinBalance
		this.estimatedInUsd=estimatedInUsd
	}

	static async createFromJson(json:any)
	:Promise<Result<BalanceLine,ValidationError[]>>{
		const BL=new BalanceLine(json.coinKind,json.coinBalance,json.estimatedInUsd)

		const errors = await validate(BL);
		if (errors.length > 0) return Err(errors);

        return Ok(BL)
	}

    toString(){
        return `coin: ${this.coinKind} - balance: ${this.coinBalance} - estimateInUsd: ${this.estimatedInUsd}`
    }
}

export class Balance implements IToString{
    readonly balance:BalanceLine[]

    private constructor(array:BalanceLine[]){
        this.balance=array
    }

    static async createFromJson(data:any[])
	:Promise<Result<Balance,ValidationError>>
	{
		try{
			let balanceLines:BalanceLine[]=[]
			for(let i=0;i<data.length;i++){
				const bl=(await BalanceLine.createFromJson(data[i]))
					.expect("creating balance line");
				balanceLines.push(bl)
			}
			const b=new Balance(balanceLines)
			return Ok(b)
		}catch(e){
			return e
		}

    }

    toString():string{
        let str=""
        let i=0
        for(const b of this.balance){
            str+= b.toString()
            if(i < this.balance.entries.length){
                str += "\n"
            }
            i++
        }
        return "balance: " + str
    }
}



export function isCreatorCoinPrice(data:any):data is CreatorCoinPrice{
    if(
        data.symbol == undefined ||
        data.priceInUSD == undefined ||
        data.priceInRLY==undefined)
    {
        return false
    }
    return true
}
