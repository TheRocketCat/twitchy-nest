jest.mock("node-fetch")
import * as nf from "node-fetch"
import {fetchJsonProperty} from "./http"
import {OkImpl} from "ts-results"

const mockedNodeFetch=nf as jest.Mocked<typeof nf>

describe("fetchJsonProperty",()=>{
	it("should get the correct property",async()=>{
		mockedNodeFetch.default.mockImplementationOnce(()=> {
			let r=new nf.Response()
			r.json=()=>{
				return Promise.resolve({prop:123})
			}
			r.status=200
			return Promise.resolve(r)
		})

		const prop=await fetchJsonProperty(
			"http://dummy.xxx","prop"
		)
		expect(prop.val).toEqual(123)
	})
})
