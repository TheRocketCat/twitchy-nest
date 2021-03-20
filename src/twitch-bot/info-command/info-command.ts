import { InfoCommandService } from '../../info-command/info-command.service';
import { extractCommandArgs } from '../shared/utilities/args';
import { CreateInfoCommandDto } from '../../info-command/dto/create-info-command.dto';
import { ReadInfoCommandDto } from '../../info-command/dto/read-info-command.dto';
import { Userstate } from 'tmi.js';
import { Result, Ok, Err } from 'ts-results';

import { TwitchOwner, isOwner, UnauthorizedError } from '../auth';

import { validate, ValidationError } from 'class-validator';

export class TwitchInfoCommand {
	constructor(private ICS: InfoCommandService) {}

	//!infoCmd create {cmd} "{info}"
	/**
	 *
	 */
	@TwitchOwner()
	async create(
		channel: string,
		userstate: Userstate,
		...[cmd, info]: any[]
	): Promise<Result<void, Error>> {
		if (isOwner(channel, userstate) == false) {
			return Err(new UnauthorizedError());
		}
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

	async get(channel: string, cmd: string) {
		return this.ICS.getInfoCmd({ channel, cmd });
	}
}

/*
async function getValidatedType<T >(dtoClass:{new ():T},args:any[],channel?:string)
//async function getValidatedType<T extends { new (...args: any[]): {} }>
//(dtoClass:T,args:any[],channel?:string)
:Promise<Result<T,ValidationError[]>> {
	const dto=new dtoClass()
	console.log(Object.getOwnPropertyNames(dto))
	//console.log(Object.keys(dto))
	//console.log(Object.getOwnPropertyDescriptors(dtoClass))
	//console.log(Object.getOwnPropertyDescriptors(dto))
	if(dto.hasOwnProperty("channel")){
		//@ts-ignore - we checked to make sure it has
		dto.channel=channel
	}
	let i=0;
	for(let p of Object.getOwnPropertyNames(dto)){
		//console.log("property: ", p)
		if(p == "channel") continue
		dto[p]=args[i]
		i++
	}

	//@ts-ignore - not ideal but TS doesnt get it
	//and the rest of the code understands properly
	const errors=await validate(dto)
	if(errors.length > 0){
		return Err(errors)
	}

	//TODO idk why this gives compiler error but works fine ignmoreing it
	//at least for now lol, catch you in the looney bin
	return Ok(dto)
}
*/
/*
async function x(){
	const args=extractCommandArgs("!createInfoCmd hej").expect("parsing args")
	const res=await getValidatedType(ReadInfoCommandDto,args,"channel")

	const val=res.unwrap()
	console.log(val.channel)
	console.log(val.cmd)
}
*/

class TwitchTest {
	@TwitchOwner()
	test(
		channel: string,
		userstate: Userstate,
		x: string,
		y: string,
	): Result<string, Error> {
		console.log('channel:', channel);
		console.log('userstate:', userstate);
		console.log('x:', x);
		console.log('y:', y);
		return Ok('success');
	}

	@TwitchOwner()
	x(channel: string, userstate: Userstate): Result<void, Error> {
		return Ok.EMPTY;
	}
}

function t() {
	const tIC = new TwitchTest();
	const res = tIC.x('#x', { username: 'x' });
	console.log('x:', res);
}
t();
