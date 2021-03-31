import { Module } from '@nestjs/common';
import { AutoCommandService } from './auto-command.service';
import { AutoCommand, AutoCommandSchema } from './schemas/auto-command.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: AutoCommand.name, schema: AutoCommandSchema },
		]),
	],
	providers:[ AutoCommandService ]
})
export class AutoCommandModule {}
