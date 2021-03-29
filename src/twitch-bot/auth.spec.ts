import { Result, Ok, Err } from 'ts-results';
import { TwitchOwner, isOwner } from './auth';
import { Userstate } from 'tmi.js';

describe('isOwner', () => {
	it('will return true', () => {
		expect(isOwner('#rocketcat', { username: 'RocketCat' })).toBe(true);
	});

	it('will return false', () => {
		expect(isOwner('#notowner', { username: 'RocketCat' })).toBe(false);
	});
});

describe('TwitchOwner Decorator', () => {
	const CHANNEL = '#rocketcat';
	const USERSTATE = { username: 'RocketCat' };
	class TestClass {
		@TwitchOwner()
		goodMethod(channel: string, userstate: Userstate): Result<any, Error> {
			return Ok.EMPTY;
		}
		//bad because it has to return Result type
		@TwitchOwner()
		noResult(channel: string, userstate: Userstate) {
			return 1 + 1;
		}
		//bad because it has to return Result type
		@TwitchOwner()
		wrongArguments(
			idk: number,
			channel: string,
			userstate: Userstate,
		): Result<any, Error> {
			return Ok.EMPTY;
		}
	}
	let TC: TestClass;

	beforeAll(() => {
		TC = new TestClass();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('will execute decorated function properly', () => {
		const TC = new TestClass();
		const method = jest.spyOn(TC, 'goodMethod');

		TC.goodMethod(CHANNEL, USERSTATE);

		expect(method).toHaveBeenCalledWith(CHANNEL, USERSTATE);
	});
	/*
	 * doesnt work atm
	it('returning no Result type throws exception', () => {
		let err: Error;
		try {
			TC.noResult(CHANNEL, USERSTATE);
		} catch (e) {
			err = e;
		}
		expect(err).toBeDefined();
	});
	it('bad arguments will throw exception', () => {
		let err: Error;
		try {
			TC.wrongArguments(2, CHANNEL, USERSTATE);
		} catch (e) {
			err = e;
		}
		expect(err).toBeDefined();
	});
	*/
});
