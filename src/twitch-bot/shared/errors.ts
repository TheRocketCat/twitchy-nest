export class WrongAmountOfArgsError extends Error {
	constructor(message?: string) {
		super();
		this.name = 'WrongAmountOfArgsError';
		this.message = message ? message : 'more or less arguments are needed';
	}
}
