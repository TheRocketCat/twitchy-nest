import { Test, TestingModule } from '@nestjs/testing';
import { InfoCommandController } from './info-command.controller';
import { InfoCommandService } from './info-command.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoCommand, InfoCommandSchema } from './schemas/info-command.schema';

describe('InfoCommandController', () => {
	let controller: InfoCommandController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [InfoCommandController],
			providers: [InfoCommandService],
			imports: [
				MongooseModule.forRoot('mongodb://localhost/twitchy_test'),
				MongooseModule.forFeature([
					{ name: InfoCommand.name, schema: InfoCommandSchema },
				]),
			],
		}).compile();

		controller = module.get<InfoCommandController>(InfoCommandController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
