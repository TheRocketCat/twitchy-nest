import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoCommandModule } from './info-command/info-command.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoCommandService } from './auto-command/auto-command.service';
import { AutoCommandModule } from './auto-command/auto-command.module';

@Module({
	imports: [
		InfoCommandModule,
		MongooseModule.forRoot('mongodb://localhost/twitchy'),
		AutoCommandModule,
	],
	controllers: [AppController],
	providers: [AppService, AutoCommandService],
	//,exports:[InfoCommandModule]
})
export class AppModule {}
