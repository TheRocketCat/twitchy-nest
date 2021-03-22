import { Injectable } from '@nestjs/common';
import { 
	CreateInfoCommandDto
	,ReadInfoCommandDto 
	,UpdateInfoCommandDto 
	,DeleteInfoCommandDto 
} from './dto';
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

	async delete(dto:DeleteInfoCommandDto) {
		return this.InfoCommandModel.deleteOne(dto)
	}
}
