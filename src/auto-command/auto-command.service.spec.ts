import { AutoCommandService } from './auto-command.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Ok } from 'ts-results';
import {
	AutoCommand,
	AutoCommandDoc,
	//,AutoCommandModel
} from './schemas/auto-command.schema';
import { 
	Model,
	Query,
} from 'mongoose';
import { createMock } from '@golevelup/ts-jest';
import {OWNED_CHANNEL} from "../../test/utilities"

interface IAutoCommand {
	id: string;
	channel: string;
	name: string;
	info: string;
	interval: number;
}

const mockAutoCommand = ({
	id = 'a uuid',
	channel = OWNED_CHANNEL,
	name = 'myName',
	info = 'this info will print',
	interval = 5000,
}): IAutoCommand => ({ id, channel, name, info, interval });

const mockAutoCommandDoc = (
	mock?: Partial<IAutoCommand>,
): Partial<AutoCommandDoc> => ({
	_id: mock?.id || 'a uuid',
	channel: mock?.channel || OWNED_CHANNEL,
	name: mock?.name || 'myName',
	info: mock?.info || 'this info will print',
	interval:mock?.interval || 5000
});

describe('AutoCommandService', () => {
	let service: AutoCommandService;
	let model: Model<AutoCommandDoc>;
	const NAME="myName"

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AutoCommandService,
				{
					provide: getModelToken(AutoCommand.name),
					useValue: {
						new: jest.fn().mockResolvedValue(mockAutoCommand({})),
						constructor: jest.fn().mockResolvedValue(mockAutoCommand({})),
						create: jest.fn(),
						findOne: jest.fn(),
						updateOne:jest.fn(),
						deleteOne:jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<AutoCommandService>(AutoCommandService);
		model = module.get<Model<AutoCommandDoc>>(getModelToken(AutoCommand.name));
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create auto cmd', async () => {
		const info = 'this will print';
		const interval = 5000
		jest
			.spyOn(model, 'create')
			.mockImplementationOnce(() => Promise.resolve(mockAutoCommand({})));

		const res = await service.create({ channel: OWNED_CHANNEL, name:NAME, info, interval });
		expect(res).toEqual(mockAutoCommand({}));
	});

	/*
	it('should get CMD', async () => {
		jest.spyOn(model, 'findOne').mockReturnValueOnce(
			createMock<Query<AutoCommandDoc, AutoCommandDoc>>({
				exec: jest.fn().mockResolvedValueOnce(mockAutoCommandDoc()),
			}),
		);

		const res = await service.getAutoCmd({ channel: OWNED_CHANNEL, cmd:CMD });
		expect(res).toEqual(mockAutoCommandDoc());
	});

	it('should update info', async () => {
		const newAuto="this is the new info"
		const returned=mockAutoCommand({info:newAuto})
		jest.spyOn(model, 'updateOne').mockReturnValueOnce(
		  createMock<Query<{ok:number,n:number,nModified:number}, AutoCommandDoc>>({
			exec: jest.fn().mockResolvedValueOnce({ok:1,n:1,nModified:1}),
		  }),
		);
		const res = await service.updateAuto({channel:OWNED_CHANNEL,cmd:"myCmd",info:newAuto});
		expect(res.ok).toBeTruthy()
		expect(res.nModified).toBe(1)
	});

	it("should remove info cmd",async()=>{
		jest.spyOn(model, 'deleteOne').mockResolvedValueOnce({ok:1,deletedCount:1,n:1});
		const res = await service.delete({channel:OWNED_CHANNEL,cmd:"myCmd"});
		expect(res.ok).toBeTruthy()
		expect(res.deletedCount).toBe(1)
	})
	*/
});
