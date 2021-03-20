import { Test, TestingModule } from '@nestjs/testing';
import { InfoCommandService } from './info-command.service';
import { getModelToken } from '@nestjs/mongoose';
import { Ok } from 'ts-results';
import {
	InfoCommand,
	InfoCommandDoc,
	//,InfoCommandModel
} from './schemas/info-command.schema';
import { Model, Query } from 'mongoose';
import { createMock } from '@golevelup/ts-jest';

const USERSTATE = {
	username: 'username',
};
const OWNED_CHANNEL = '#' + USERSTATE.username;
const NOT_OWNED_CHANNEL = '#notownedchannel';

interface IInfoCommand {
	id: string;
	channel: string;
	cmd: string;
	info: string;
}

const mockInfoCommand = (
	id = 'a uuid',
	channel = OWNED_CHANNEL,
	cmd = 'myCmd',
	info = 'this info will print',
): IInfoCommand => ({ id, channel, cmd, info });

const mockInfoCommandDoc = (
	mock?: Partial<IInfoCommand>,
): Partial<InfoCommandDoc> => ({
	_id: mock?.id || 'a uuid',
	channel: mock?.channel || OWNED_CHANNEL,
	cmd: mock?.cmd || 'myCmd',
	info: mock?.info || 'this info will print',
});

describe('InfoCommandService', () => {
	let service: InfoCommandService;
	let model: Model<InfoCommandDoc>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InfoCommandService,
				{
					provide: getModelToken(InfoCommand.name),
					useValue: {
						new: jest.fn().mockResolvedValue(mockInfoCommand()),
						constructor: jest.fn().mockResolvedValue(mockInfoCommand()),
						create: jest.fn(),
						findOne: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<InfoCommandService>(InfoCommandService);
		model = module.get<Model<InfoCommandDoc>>(getModelToken(InfoCommand.name));
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create info cmd', async () => {
		const cmd = 'myCmd';
		const info = 'this will print';

		jest
			.spyOn(model, 'create')
			.mockImplementationOnce(() => Promise.resolve(mockInfoCommand()));

		const res = await service.create({ channel: OWNED_CHANNEL, cmd, info });
		expect(res).toEqual(mockInfoCommand());
	});

	it('should get cmd', async () => {
		const cmd = 'myCmd';

		jest.spyOn(model, 'findOne').mockReturnValueOnce(
			createMock<Query<InfoCommandDoc, InfoCommandDoc>>({
				exec: jest.fn().mockResolvedValueOnce(mockInfoCommandDoc()),
			}),
		);

		const res = await service.getInfoCmd({ channel: OWNED_CHANNEL, cmd });
		expect(res).toEqual(mockInfoCommandDoc());
	});
});
