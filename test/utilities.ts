import {CmdHandler} from "../src/twitch-bot/cmd-handler"
import {Userstate} from "tmi.js"


export const USERSTATE = {
	username: 'RocketCat',
};
export const OWNED_CHANNEL = '#' + USERSTATE.username.toLowerCase();
export const NOT_OWNED_CHANNEL = '#notownedchannel';

/**
* makes it easier to test cmdHandler
* */
export const mockCmdHandlerParams=(
	msg:string | string[],
	{
		channel=OWNED_CHANNEL,
		userstate=USERSTATE,
		self=false
	},
	cmdSymbol=true
):[string,Userstate,string,boolean]=>{
	if(typeof msg == "object"){
		msg=msg.join(" ")
	}
	//TODO check cmd symbol if we add support for that
	if(cmdSymbol) msg="!"+msg

	return [channel,userstate,msg,self]
}
