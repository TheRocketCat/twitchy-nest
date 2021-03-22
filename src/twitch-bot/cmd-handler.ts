import { Userstate } from 'tmi.js';
import { INestApplication } from '@nestjs/common';
import { Result, Ok, Err } from 'ts-results';

import { extractCommandArgs } from './shared/utilities/args';
import { TwitchInfoCommand } from './info-command/info-command';
import {UserError} from "../shared/error"

import {InfoCommandService} from "../info-command/info-command.service"

export class CmdHandler {
	constructor(private TIC: TwitchInfoCommand) {}

	async executeCmd(
		channel: string,
		userstate: Userstate,
		msg: string,
		self: boolean,
	): Promise<Result<any, Error>> {
		//remove extra whitesplace, get first cmd and remove cmd symbol
		const cmd = msg.trim().split(' ')[0].substring(1);

		let cmdResult: Result<any, Error>;
		let args:any[];
		try{
			args = extractCommandArgs(msg).expect('parsing args');
		}catch(e){
			return Err(new UserError("double check your cmd arguments"))
		}
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
			case TwitchInfoCommand.createCmd:
				cmdResult = await this.TIC.create(channel, userstate, args);
				break;
			case TwitchInfoCommand.updateInfoCmd:
				cmdResult=await this.TIC.updateInfo(channel,userstate, args)
				break;
			case TwitchInfoCommand.deleteCmd:
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

export function standardCmdHandlerSetup(app:INestApplication):CmdHandler {
	const infoCmdService = app.get(InfoCommandService);
	return new CmdHandler(new TwitchInfoCommand(infoCmdService));
}
