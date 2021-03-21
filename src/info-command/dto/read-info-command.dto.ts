import { IsNotEmpty } from 'class-validator';
import { Result, Ok, Err } from 'ts-results';
import { validate, ValidationError } from 'class-validator';

/*
type Constructor = new (...args: any[]) => {};


Experiment for later
function createAndValidateMixin<TBase extends Constructor, Args>(Base: TBase) {
  return class CreateAndValidate extends Base{
		static async createAndValidate(args:Args){
			const dto=new Base(args)

			const errors=await validate(dto)
			if(errors.length > 0) return Err(errors)

			return Ok(dto)
		}
	}
}
export class ReadInfoCommandDto 
extends createAndValidateMixin<any,number>(ReadInfoCommandBase){}
*/

export class ReadInfoCommandDto{
	constructor(channel:string,cmd:string){
		this.channel=channel
		this.cmd=cmd
	}
	static async createAndValidate(channel:string,cmd:string)
	:Promise<Result<ReadInfoCommandDto,ValidationError[]>>{
		const dto=new ReadInfoCommandDto(channel,cmd)

		const errors=await validate(dto)
		if(errors.length > 0) return Err(errors)

		return Ok(dto)
	}

	@IsNotEmpty()
	channel:string

	@IsNotEmpty()
	cmd:string
}
