import { Userstate } from 'tmi.js';
import { INestApplication } from '@nestjs/common';
import { Result, Ok, Err } from 'ts-results';

import { extractCommandArgs } from './shared/utilities/args';
import { TwitchInfoCommand } from './info-command/info-command';
import { TwitchRallyCommand } from "./rally/commands";
import { TwitchAutoCommand } from "./auto-command/commands";
import {UserError} from "../shared/error"
import {IToString} from "./shared/interfaces/string"

import {InfoCommandService} from "../info-command/info-command.service"
import {AutoCommandService} from "../auto-command/auto-command.service"

export class CmdHandler {
	private cmds:Map<string,any>
	constructor(
		private infoCommand: TwitchInfoCommand,
		private rallyCommand: TwitchRallyCommand,
		private autoCommand: TwitchAutoCommand,
	) {
		this.cmds=new Map()
		this.mount(rallyCommand)
		this.mount(infoCommand)
		this.mount(autoCommand)
	}

	//not the cleanest solution, but works like a charm so far
	private mount(c:any){
		const prototype=Object.getPrototypeOf(c)
		let b=prototype.constructor==undefined
		if(b){
			//means that it was called on mock 
			//most likely and therefor should be skipped
			return
		}
		b=prototype.constructor.scmds==undefined
		if(b){
			//means that it was called on mock 
			//most likely and therefor should be skipped
			return
		}
		prototype.constructor.scmds.forEach(([cmd,prop])=>{
			const f=c[prop]
			const boundF=f.bind(c)
			this.cmds.set(cmd,boundF)
		})
	}

	/**
	 * gets called from twitch message events to find the corresponding 
	 * action or check custom info commands for that channel.
	 */
	async cmdSwitch(channel:string,userstate:Userstate,msg:string,self:boolean){
		const cmd = msg.trim().split(' ')[0].substring(1);

		const f=this.cmds.get(cmd)
		if(f==undefined){
			//check custom commands
			return await this.infoCommand.get(channel,cmd)
			//return Err(new UserError("no such command"))
		}

		let args:any[];
		try{
			args = extractCommandArgs(msg).expect('parsing args');
		}catch(e){
			return Err(new UserError("double check your cmd arguments"))
		}

		//const res=await f(channel,userstate,args)
		return await f(channel,userstate,args)
	}

	/**
	 * @deprecated ?
	 */
	async executeCmd(
		channel: string,
		userstate: Userstate,
		msg: string,
		self: boolean,
	): Promise<Result<IToString|string|void, Error>> {
		//remove extra whitesplace, get first cmd and remove cmd symbol
		const cmd = msg.trim().split(' ')[0].substring(1);

		let cmdResult: Result<IToString|string|void, Error>;
		let args:any[];
		try{
			args = extractCommandArgs(msg).expect('parsing args');
		}catch(e){
			return Err(new UserError("double check your cmd arguments"))
		}
		//standard commands
		switch (cmd) {
		   //Rally
		   case TwitchRallyCommand.getCoinCountCmd:
				cmdResult=await this.rallyCommand.getCoinCount(channel,userstate,args)
				break

			//InfoCommand 
			case TwitchInfoCommand.createCmd:
				cmdResult = await this.infoCommand.create(channel, userstate, args);
				break;
			case TwitchInfoCommand.updateInfoCmd:
				cmdResult=await this.infoCommand.updateInfo(channel,userstate, args)
				break;
			case TwitchInfoCommand.deleteCmd:
				cmdResult=await this.infoCommand.delete(channel,userstate,args)
				break;
		}

		//check custom commands
		if(cmdResult==undefined){
			cmdResult=await this.infoCommand.get(channel,cmd)

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
	const autoCmdService = app.get(AutoCommandService);
	return new CmdHandler(
		new TwitchInfoCommand(infoCmdService),
		new TwitchRallyCommand(),
		new TwitchAutoCommand(autoCmdService)
	);
}
