import { IsNotEmpty } from 'class-validator';
import { Result, Ok, Err } from 'ts-results';
import { validate, ValidationError } from 'class-validator';

export class CreateInfoCommandDto {
	constructor(channel: string, cmd: string, info: string) {
		this.channel = channel;
		this.cmd = cmd;
		this.info = info;
	}
	static async createAndValidate(
		channel: string,
		cmd: string,
		info: string,
	): Promise<Result<CreateInfoCommandDto, ValidationError[]>> {
		const dto = new CreateInfoCommandDto(channel, cmd, info);

		const errors = await validate(dto);
		if (errors.length > 0) return Err(errors);

		return Ok(dto);
	}
	@IsNotEmpty()
	channel: string;

	@IsNotEmpty()
	cmd: string;

	@IsNotEmpty()
	info: string;
}
