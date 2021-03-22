import { InfoCommandService } from '../../info-command/info-command.service';
import { CreateInfoCommandDto } from '../../info-command/dto/create-info-command.dto';
import {InfoCommandDoc} from "../../info-command/schemas/info-command.schema"
import { ReadInfoCommandDto } from '../../info-command/dto/read-info-command.dto';
import { UpdateInfoCommandDto } from '../../info-command/dto/update-info-command.dto';
import { Userstate } from 'tmi.js';
import { Result, Ok, Err } from 'ts-results';

import { TwitchOwner, UnauthorizedError } from '../auth';
import {UserError,SystemFailureError} from "../../shared/error"

export class TwitchInfoCommand {
	
	static readonly cmd="infoCmd"
	static readonly createCmd=TwitchInfoCommand.cmd+"Create"
	static readonly updateInfoCmd=TwitchInfoCommand.cmd+"UpdateInfo"
	static readonly deleteCmd=TwitchInfoCommand.cmd+"Delete"

	constructor(private ICS: InfoCommandService){}

	@TwitchOwner()
	async create(
		channel: string,
		userstate: Userstate,
		[cmd, info]: any[]
	): Promise<Result<void, Error>> {
		try {
			const dto = (
				await CreateInfoCommandDto.createAndValidate(channel, cmd, info)
			).unwrap();

			await this.ICS.create(dto);
			return Ok.EMPTY;
		} catch (e) {
			return Err(e);
		}
	}

	async get(channel: string, cmd: string):Promise<Result<InfoCommandDoc,Error>> {
		try{
			const dto=(await ReadInfoCommandDto
				.createAndValidate(channel,cmd))
				.unwrap();
			const doc=await this.ICS.getInfoCmd(dto);
			if(doc == null){
				return Err(new UserError("no such command"))
			}else if(doc.errors){
				return Err(doc.errors)
			}
			return Ok(doc)
		}catch(e){ return Err(e)}
	}

	@TwitchOwner()
	async updateInfo(channel:string,userstate:Userstate,[cmd,newInfo]:any[])
	:Promise<Result<void,Error>>{
		try{
			const dto=(await UpdateInfoCommandDto
				.createAndValidate(channel,cmd,newInfo))
				.unwrap()
			const res=await this.ICS.updateInfo(dto)
			if(!res.ok){
				return Err(new SystemFailureError("mongodb update info"))
			}else if(res.nModified==0){
				return Err(new UserError("no such command")) 
			}
			return Ok.EMPTY
		}catch(e){ return Err(e) }
	}
}
