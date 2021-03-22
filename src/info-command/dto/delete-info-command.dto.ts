import { IsNotEmpty } from 'class-validator';
import { Result, Ok, Err } from 'ts-results';
import { validate, ValidationError } from 'class-validator';

export class DeleteInfoCommandDto{
	constructor(channel:string,cmd:string){
		this.channel=channel
		this.cmd=cmd
	}
	static async createAndValidate(channel:string,cmd:string)
	:Promise<Result<DeleteInfoCommandDto,ValidationError[]>>
	{
		const dto=new DeleteInfoCommandDto(channel,cmd)

		const errors=await validate(dto)
		if(errors.length > 0) return Err(errors)

		return Ok(dto)
	}

	@IsNotEmpty()
	channel:string

	@IsNotEmpty()
	cmd:string
}
