export function TwitchCmd(cmd:string){
	return function(target:any, prop:string,descriptor:PropertyDescriptor){
		/*
		if(CMDS.has(cmd)){
			throw new Error(`duplicate command: ${cmd}`)
		}
		if(descriptor.value == undefined){
			throw new Error("this is only supposed to be used on class methods")
		}
		*/
		
		//target.cmds.push([cmd,prop])
		
		//TODO maybe a case can be made to make this for instances, but idk atm depds on teh aarch
		//or make it so that Cmd classes are singletons
		//kinda hacky, but seems to work
		if(target.constructor.scmds==undefined){
			target.constructor.scmds=[]
		}

		target.constructor.scmds.push([cmd,prop])
	}
}

/*
export function TwitchCmdHandler<T extends { new (...args: any[]): {} }>(constructor: T) 
{
	Object.defineProperty(constructor,"scmds",{
	  enumerable: false,
	  configurable: false,
	  writable: false,
	  value: []
	})
	console.log("CONSTRUCTOR",constructor)
}
*/
