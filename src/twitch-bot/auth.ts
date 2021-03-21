import { Userstate } from 'tmi.js';
import { Result, Err } from 'ts-results';
import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

//ERRORS
export class UnauthorizedError extends Error {
	constructor() {
		super();
		this.name = 'unauthorized error';
		this.message = 'user is not authorized';
	}
}

//TODO dubble check this is true, but seems like it or maybe username.lower
export function isOwner(channel: string, userstate: Userstate): boolean {
	//TODO this assumes that channel is always lower case
	return channel == '#' + userstate.username.toLowerCase();
}

//TODO investigate using linting to properly tell users of this decorators 
// requirments
/**
 * @param {string} channel
 * @param {Userstate} userstate
 * A decorating that makes sure only the owner of the cannel can
 * call this function.
 * The decorated method must take at least channel:string and userstate:Userstate
 * arguments to function.
 * Functions using this decorator must return Result.
 */
export function TwitchOwner(){
	return function (
		target: any,
		propertyName: string,
		descriptor: PropertyDescriptor,
	) {
		  let method = descriptor.value!;

		  descriptor.value = async function ():Promise<Result<any,Error>> {
			let requiredParameters: any[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
			if (requiredParameters) {
			  for (let parameterIndex of requiredParameters) {
				if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
				  throw new Error("Missing required argument.");
				}
			  }
			}

			const [channel,userstate] = arguments

			if(channel == "#" + userstate.username.toLowerCase()){
				const res=await method.apply(this,arguments)
				if(res.ok == undefined || res.err == undefined){
					throw new Error("method must return type Result< your type ,Error>")
				}
				return res
			}else return Err(new UnauthorizedError())
		  };
	}
}
