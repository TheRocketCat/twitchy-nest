
/**
* Meant to be directly given to users, because it's
* they who fd up. When using this type, make sure
* to not give out any sensetive information and
* be clear about what the user did wrong.
*/
export class UserError extends Error{
	constructor(message:string){
		super()
		this.name="UserError"
		this.message=message
	}
}

export class SystemFailureError extends Error{
	constructor(message:string="admin needed now"){
		super()
		this.name="SystemFailure"
		this.message=message
	}
}

/**
* probably not very needed
* @deprecated
*/
export class WrongAmountOfArgsError extends Error {
	constructor(message?: string) {
		super();
		this.name = 'WrongAmountOfArgsError';
		this.message = message ? message : 'more or less arguments are needed';
	}
}
