import { Userstate } from 'tmi.js';
import { Result, Err } from 'ts-results';

//TODO dubble check this is true, but seems like it or maybe username.lower
export function isOwner(channel: string, userstate: Userstate): boolean {
	//TODO this assumes that channel is always lower case
	return channel == '#' + userstate.username.toLowerCase();
}

/**
 * Functions using this decorator should return Result,
 * because atm the type system isnt enforcing that properly.
 * Also it must take at least two parameters in this order
 * @param {string} channel
 * @param {Userstate} userstate
 */
export function TwitchOwner() {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor,
	) {
		const OGFunc = descriptor.value;

		//temporary annoyance, since idk how to make type system check this for me
		const isResult = function (r: any): r is Result<any, any> {
			if (r == undefined) {
				throw new Error(
					'Read the fucking manual: your function must return a result',
				);
			} else if (!r.hasOwnProperty('ok') || !r.hasOwnProperty('err')) {
				throw new Error(
					'Read the fucking manual: your function must return a result',
				);
			}
			return true;
		};

		descriptor.value = function (
			channel: string,
			userstate: Userstate,
			...args: any[]
		): Result<any, Error> {
			//typesystem doesnt catch incorrect usage of the decorator
			//so here is some helpfull error messages for yall who didnt RTFM
			if (channel == undefined || typeof channel != 'string') {
				throw new Error(
					'Read the fucking manual: your functions first parameter has to be a channel',
				);
			} else if (userstate == undefined) {
				throw new Error(
					'Read the fucking manual: your functions second parameter has to be a Userstate',
				);
			}

			if (isOwner(channel, userstate)) {
				const hopefullyAResult = OGFunc(channel, userstate, ...args);
				//temporary annoyance, since idk how to make type system check this for me
				if (isResult(hopefullyAResult)) {
					return hopefullyAResult;
				}
			} else {
				return Err(new UnauthorizedError());
			}
		};
	};
}

//ERRORS
export class UnauthorizedError extends Error {
	constructor() {
		super();
		this.name = 'unauthorized error';
		this.message = 'user is not authorized';
	}
}
