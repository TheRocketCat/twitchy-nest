import * as tmi from 'tmi.js';

const opts = {
	options: { debug: true, messagesLogLevel: 'info' },
	identity: {
		username: 'DaRockeCat',
		password: process.env.OAUTH,
	},
	channels: ['darockecat'],
};

/**
 * @deprecated ?
* */
export class TSC {
	private static _client: tmi.Client;

	static init() {
		if (this._client == undefined) {
			this._client = new tmi.client(opts);
			this._client.connect();
		}
	}

	static get client(): tmi.Client {
		return this._client;
	}
}
