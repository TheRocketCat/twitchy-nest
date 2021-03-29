import { Result ,Ok ,Err } from "ts-results"
import fetch, {Response} from "node-fetch"

export async function fetchJson(url:string):Promise<Result<any,Error>>{
    try{
        const res=await fetch(url)
        correctStatus(res).expect("check status")
        return Ok(await res.json())
    }catch(e){
        return Err(e)
    }
}

export async function fetchJsonProperty(url:string,prop:string){
    try{
        const res=await fetch(url)
        correctStatus(res).expect("check status")
		const json=await res.json()
		if(json[prop]==undefined){
			return Err(new Error("property is undefined"))
		}
        return Ok(json[prop])
    }catch(e){
        return Err(e)
    }
}

export function correctStatus(r:Response):Result<void,Error>{
    if(r.status < 200 || r.status > 299){
        return Err(new Error(`code ${r.status}`))
    }
    return Ok.EMPTY
}
