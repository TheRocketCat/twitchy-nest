import {Result,Ok,Err} from "ts-results"
import {TwitchCmd} from "../cmd-decorator"
import {TwitchOwner} from "../auth"
import {Userstate} from "tmi.js"
import {AutoCommandService} from "../../auto-command/auto-command.service"
import { 
	CreateAutoCommandDto
	/*
	,ReadAutoCommandDto 
	,UpdateAutoCommandDto 
	,DeleteAutoCommandDto 
*/
} from '../../auto-command/dto';


export class TwitchAutoCommand{
	static readonly cmd="autoCmd"
	static readonly createCmd=TwitchAutoCommand.cmd+"create"

	constructor(private ACS:AutoCommandService){}

	@TwitchCmd(TwitchAutoCommand.createCmd)
	@TwitchOwner()
	async create(channel:string,us:Userstate,[name,info,interval]:string[])
	:Promise<Result<void,Error>>{
		try{
			const intervalMS=Number(interval)*1000
			const dto=(
				await CreateAutoCommandDto.createAndValidate(
					channel,name,info,
					intervalMS
			)).unwrap()
			await this.ACS.create(dto)
			return Ok.EMPTY
		}catch(e){
			//console.log("errors:", doc.errors)
			return Err(e)

		}
	}
}
