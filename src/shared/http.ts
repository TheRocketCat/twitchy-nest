import { Result ,Ok ,Err } from "ts-results"

export async function fetchJson(url:string):Promise<Result<any,Error>>{
    try{
        const res=await fetch(url)
        correctStatus(res).expect("check status")
        return Ok(await res.json())
    }catch(e){
        return Err(e)
    }
}

export function correctStatus(r:Response):Result<void,Error>{
    if(r.status <= 200 && r.status > 300){
        return Err(new Error(`code ${r.status}`))
    }
    return Ok.EMPTY
}
