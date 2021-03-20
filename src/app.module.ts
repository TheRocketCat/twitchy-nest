import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoCommandModule } from './info-command/info-command.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		InfoCommandModule,
		MongooseModule.forRoot('mongodb://localhost/twitchy'),
	],
	controllers: [AppController],
	providers: [AppService],
	//,exports:[InfoCommandModule]
})
export class AppModule {}
