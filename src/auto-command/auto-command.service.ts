import { Injectable } from '@nestjs/common';
import { 
	CreateAutoCommandDto
/*
	,ReadAutoCommandDto 
	,UpdateAutoCommandDto 
	,DeleteAutoCommandDto 
*/
} from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AutoCommand, AutoCommandDoc } from './schemas/auto-command.schema';

@Injectable()
export class AutoCommandService {
	constructor(
		@InjectModel(AutoCommand.name)
		private AutoCommandModel:Model<AutoCommandDoc>
	){}

	async create(dto:CreateAutoCommandDto)
	:Promise<AutoCommandDoc>{
		return await this.AutoCommandModel.create(dto)
	}
	/*
	async getAutoCommand(dto:CreateAutoCommandDto)
	:Promise<AutoCommandDoc>{
		//return await this.AutoCommandModel.create([dto],{validateBeforeSave:false})[0]
		//return this.AutoCommandModel.create(dto)
	}
	*/
}
