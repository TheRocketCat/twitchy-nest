import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { InfoCommandService } from './info-command.service';
import { CreateInfoCommandDto } from './dto/create-info-command.dto';
import { UpdateInfoCommandDto } from './dto/update-info-command.dto';

@Controller('info-command')
export class InfoCommandController {
	constructor(private readonly infoCommandService: InfoCommandService) {}

	/*
	@Post()
	create(@Body() createInfoCommandDto: CreateInfoCommandDto) {
		console.log('executed');
		return this.infoCommandService.create(createInfoCommandDto);
	}

	@Get()
	findAll() {
		return this.infoCommandService.findAll();
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateInfoCommandDto: UpdateInfoCommandDto,
	) {
		return this.infoCommandService.update(+id, updateInfoCommandDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.infoCommandService.remove(+id);
	}
	*/
}
