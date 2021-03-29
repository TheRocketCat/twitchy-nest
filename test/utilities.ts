import {CmdHandler} from "../src/twitch-bot/cmd-handler"
import {Userstate} from "tmi.js"
import * as nf from "node-fetch"


//commonly used mock vars
export const USERSTATE = {
	username: 'RocketCat',
};
//commonly used mock vars
export const NOT_OWNER_USERSTATE = {
	username: 'hackerdude',
};
export const OWNED_CHANNEL = '#' + USERSTATE.username.toLowerCase();
export const NOT_OWNED_CHANNEL = '#notownedchannel';

/**
* makes it easier to test cmdHandler
* */
export const mockCmdParams=(
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

//node fetch
export const mFetch=nf as jest.Mocked<typeof nf>

export function mockFetchResult(json:any,status=200){
	const r=new nf.Response()
	r.status=status
	r.json=()=>Promise.resolve(json)
	return r
}
