import { Module } from '@nestjs/common';
import { InfoCommandService } from './info-command.service';
import { InfoCommand, InfoCommandSchema } from './schemas/info-command.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: InfoCommand.name, schema: InfoCommandSchema },
		]),
	],
	//controllers: [InfoCommandController],
	providers: [
		InfoCommandService,
		/*
		,{
			provide:getModelToken(InfoCommand.name)
			,useValue:InfoCommand
		}
		*/
	],
	//,exports:[InfoCommandService,InfoCommandController]
})
export class InfoCommandModule {}
