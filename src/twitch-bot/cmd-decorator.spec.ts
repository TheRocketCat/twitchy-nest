import {TwitchCmd} from "./cmd-decorator"


describe("TwitchCmd decorator [unit]",()=>{
	class Commands {
		static scmds=[]
		v:number
		constructor(v:number){
			this.v=v
		}
		@TwitchCmd("X")
		xFunc(){
			return this.v
		}
		@TwitchCmd("Y")
		yFunc(){
			return this.v+2
		}
	}

	//this is like a copy of the real CmdHandler
	class CmdHandler{
		private cmds:Map<string,any>
		constructor(cmds:Commands){
			this.cmds=new Map()
			this.mount(cmds)
		}
		private mount(c:any){
			const prototype=Object.getPrototypeOf(c)
			//console.log(prototype)
			prototype.constructor.scmds.forEach(([cmd,prop])=>{
				const f=c[prop]
				const boundF=f.bind(c)
				this.cmds.set(cmd,boundF)
			})
		}
		cmdSwitch(cmdName:string){
			//mount(commands)
			const f=this.cmds.get(cmdName)
			if(f == undefined){
				console.log("no such cmd")
				return
			}
			return f()
		}
	}
	it("should register commands properly",async ()=>{
		const cmdHandler=new CmdHandler(new Commands(5))
		let res=cmdHandler.cmdSwitch("X")
		expect(res).toBe(5)

		res=cmdHandler.cmdSwitch("Y")
		expect(res).toBe(5+2)
	})

	it("there should be two commands registered",async ()=>{
		//const cmdHandler=new CmdHandler(new Commands(5))
		expect(Commands.scmds.length).toBe(2)
	})
})
