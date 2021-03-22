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
		dto: CreateInfoCommandDto,
	): Promise<InfoCommandDoc> {
		return this.InfoCommandModel.create(dto);
	}

	async getInfoCmd(dto: ReadInfoCommandDto) {
		return this.InfoCommandModel.findOne(dto).exec();
	}

	async updateInfo(dto:UpdateInfoCommandDto){
		return this.InfoCommandModel
			.updateOne(
				{channel:dto.channel,cmd:dto.cmd}
				,{ $set: {"info": dto.info } }
			).exec()
	}

	update(id: number, updateInfoCommandDto: UpdateInfoCommandDto) {
		return `This action updates a #${id} infoCommand`;
	}

	remove(id: number) {
		return `This action removes a #${id} infoCommand`;
	}
}
