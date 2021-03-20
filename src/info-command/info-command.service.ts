import { Injectable } from '@nestjs/common';
import { CreateInfoCommandDto } from './dto/create-info-command.dto';
import { UpdateInfoCommandDto } from './dto/update-info-command.dto';
import { ReadInfoCommandDto } from './dto/read-info-command.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InfoCommand, InfoCommandDoc } from './schemas/info-command.schema';

@Injectable()
export class InfoCommandService {
	constructor(
		@InjectModel(InfoCommand.name)
		private InfoCommandModel: Model<InfoCommandDoc>,
	) {}

	async create(
		createInfoCommandDto: CreateInfoCommandDto,
	): Promise<InfoCommandDoc> {
		return this.InfoCommandModel.create(createInfoCommandDto);
	}

	async getInfoCmd(readInfoCommandDto: ReadInfoCommandDto) {
		return this.InfoCommandModel.findOne(readInfoCommandDto).exec();
		//return this.InfoCommandModel.findOne(readInfoCommandDto)
	}

	findAll() {
		return `This action returns all infoCommand`;
	}

	update(id: number, updateInfoCommandDto: UpdateInfoCommandDto) {
		return `This action updates a #${id} infoCommand`;
	}

	remove(id: number) {
		return `This action removes a #${id} infoCommand`;
	}
}
