import { IsNotEmpty } from 'class-validator';
import { Result, Ok, Err } from 'ts-results';
import { validate, ValidationError } from 'class-validator';

export class DeleteAutoCommandDto {
	constructor(channel: string, name: string, info: string,interval:number) {
		this.channel = channel;
		this.name = name;
		this.info = info;
		this.interval = interval;
	}
	static async createAndValidate(
		channel: string,
		name: string,
		info: string,
		interval: number,
	): Promise<Result<DeleteAutoCommandDto, ValidationError[]>> {
		const dto = new DeleteAutoCommandDto(channel, name, info,interval);

		const errors = await validate(dto);
		if (errors.length > 0) return Err(errors);

		return Ok(dto);
	}
	@IsNotEmpty()
	channel: string;

	@IsNotEmpty()
	name: string;

	//milliseconds in seconds
	@IsNotEmpty()
	interval: number;

	@IsNotEmpty()
	info: string;
}
