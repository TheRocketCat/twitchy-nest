import { Userstate } from 'tmi.js';
import { extractCommandArgs } from './shared/utilities/args';
import { Result, Ok, Err } from 'ts-results';

import { TwitchInfoCommand } from './info-command/info-command';
import { IToString } from './shared/interfaces';

export class CmdHandler {
	constructor(private TIC: TwitchInfoCommand) {}

	async executeCmd(
		channel: string,
		userstate: Userstate,
		msg: string,
		self: boolean,
	): Promise<Result<IToString | string | void, Error>> {
		//const command = msg.trim().split(" ")
		const commandName = msg.trim().split(' ')[0];

		//TODO handle command results
		let cmdResult: Result<IToString | string | void, Error>;
		const args = extractCommandArgs(msg).expect('parsing args');
		//standard commands
		switch (commandName) {
			/*
			case "!createAutoMsg":
				cmdResult=await createNewAutoMsgHandler(channel,userstate,msg);
			break
			case "!coinCount":
				cmdResult=await getCoinCountHandler(msg)
			break
			case "!coinPrice":
				cmdResult=await getCoinPriceHandler(msg)
			break
			case "!balance":
				cmdResult=await getBalanceHandler(msg)
			break
			case "!volume":
				cmdResult=await getVolumeHandler(msg)
			break
			*/
			case '!createInfoCmd':
				cmdResult = await this.TIC.create(channel, userstate, args);
				break;
			case '!updateInfoCmd':
				//cmdResult=await updateInfoCommandHandler(channel,userstate, msg)
				break;
			case '!deleteInfoCmd':
				//cmdResult=await deleteInfoCommandHandler(channel,userstate, msg)
				break;
		}
		//check custom commands
		/*
		if(cmdResult==undefined){
			cmdResult=await getInfoCommandHandler(channel,msg)
			if(cmdResult.err){
				client.whisper(userstate.username,"no such command")
				return Err(new Error("no such command"))
			}
		}
		*/
		return cmdResult;
	}
}

//function standardSetup() {}
