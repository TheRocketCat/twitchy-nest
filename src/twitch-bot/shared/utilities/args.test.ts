import { extractCommandArgs } from './args';

//TODO
/*
test("extract arguments correctly",()=>{
	let res=extractCommandArgs("!create \"my long string\" 2")
	expect(res.ok).toBeTruthy()
	let option=res.unwrap()
	expect(option.some).toBeTruthy()
	let args=option.unwrap()
	expect(args.length).toBe(2)
	expect(typeof args[0]).toBe("string")
	expect(Number(args[1])).not.toBeNaN()
	
	res=extractCommandArgs("!create 2 \"my other string\"")
	expect(res.ok).toBeTruthy()
	option=res.unwrap()
	expect(option.some).toBeTruthy()
	args=option.unwrap()
	expect(args.length).toBe(2)
	expect(Number(args[0])).not.toBeNaN()
	expect(typeof args[1]).toBe("string")

	res=extractCommandArgs("!create \"string command\" regularString 5")
	expect(res.ok).toBeTruthy()
	option=res.unwrap()
	expect(option.some).toBeTruthy()
	args=option.unwrap()
	expect(args.length).toBe(3)

	res=extractCommandArgs("!create 'single quotes string' noquoteString 5")
	expect(res.ok).toBeTruthy()
	option=res.unwrap()
	expect(option.some).toBeTruthy()
	args=option.unwrap()
	expect(args.length).toBe(3)
	
	res=extractCommandArgs("!create")
	expect(res.ok).toBeTruthy()
	option=res.unwrap()
	expect(option.none).toBeTruthy()
})
*/
