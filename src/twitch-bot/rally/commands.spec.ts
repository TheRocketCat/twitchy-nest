import {Result,Ok,Err} from "ts-results"
import {TwitchRallyCommand} from "./commands"
import * as http from "../../shared/http"

describe("TwitchRallyCommand",()=>{
	const TRC=new TwitchRallyCommand()
	afterEach(()=>{
		jest.clearAllMocks()
	})
	it("should get total coins",async()=>{
		jest.spyOn(http, "fetchJson").mockResolvedValueOnce(
			Ok({totalCoins:"123456789"})
		)
		const res=await TRC.getCoinCount(["coin"])
		expect(res).toEqual(Ok("123456789"))
	})
})


//  {
//    "run": {
//      "adapter": "vscode-node",
//      "configuration": {
//        "request": "launch",
//        "protocol": "auto",
//        "stopOnEntry": true,
//        "console": "integratedTerminal",
//        "program": "${workspaceRoot}/src/main.ts",
//        "cwd": "${workspaceRoot}",
//		"outFiles":["${workspaceFolder}/dist/**/*.js"],
//		"smartStep":true
//      }
//    }
//  },
