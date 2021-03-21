import { Userstate } from 'tmi.js';
import { Result, Ok, Err } from 'ts-results';

import { extractCommandArgs } from './shared/utilities/args';
import { TwitchInfoCommand } from './info-command/info-command';

export class CmdHandler {
	constructor(private TIC: TwitchInfoCommand) {}

	async executeCmd(
		channel: string,
		userstate: Userstate,
		msg: string,
		self: boolean,
	): Promise<Result<any, Error>> {
		//const command = msg.trim().split(" ")
		const cmd = msg.trim().split(' ')[0];

		let cmdResult: Result<any, Error>;
		const args = extractCommandArgs(msg).expect('parsing args');
		//standard commands
		switch (cmd) {
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
		if(cmdResult==undefined){
			cmdResult=await this.TIC.get(channel,cmd)

			/*
			if(cmdResult.err){
				return Err(new Error("no such command"))
			}
			*/
		}
		return cmdResult;
	}
}

//function standardSetup() {}
