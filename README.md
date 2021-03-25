# Twitchy
The coolest chat bot there is for your Creator Coins FANS!!!
## Description
It's the coolest, what other reason do i have to give you?
Oh... maybe that you'll potentially increase your cult followers
9000x, or that there is one feature to kick all the users at once,
or that we even included a death ray, free of charge ??!?!

## Starting
First you need a file called .env looking like this
```sh
OAUTH="my api key"
```
then run
```sh
	npm install
	npm start
```
## Usage
### Commands
Commands follow the structure of {command token}{command name} [...args]
where {} means required, and [] are optional arguments.
Double quotes will be noted when required.
**Example:**
Command: createAutoMsg "{message}" {update cycle in minutes}
```
    !createAutoMsg "i print every 10 minutes" 10
```
Anything with quotes, eg "", are strings and must be written inside those. Everything
else is numbers with different values, like minutes, coins, etc.

Command: !coinPrice [coin symbol]
```
    !coinPrice
```
```
    !coinPrice MyCoin 
```

# Development & Contributing
## Testing
We use the Jest framework, because its very handy and is suggested
for NestJs.
### Helpful Resources
[testing examples](https://github.com/jmcdo29/testing-nestjs)
[makes it easier to mock](https://github.com/golevelup/nestjs/tree/8b64d8303de9afb794df3fe50cdb557ab27e8c57/packages/testing)
[unit testing mongodb](https://dev.to/webeleon/unit-testing-nestjs-with-mongo-in-memory-54gd)
### Running tests
```sh
    npm test
```
## Return Types
Twitch Commands return the Result type. Because throwing errors
doesnt notify the collaborators of the potential issues that can
occour.

When no data is needed by the caller we return Result<void,Error>
This is done with `return Ok.EMPTY`.
When data is expected return Result< data ,Error>

## Authorization


## Conventions i'll defeand to my death
The best code is that which optimizes for productivity, readability,
stability and speed.

## ts-results
To increase stability, and code production, we use ts-results; a
library inspired by rusts results library.
It is great to increase the readability and understanding of
function signatures. We mainly use this instead of throwing errors
at people.
```Javascript
//DONT
function badFunc():number{
	if(1+1 != 3){
		throw new Error("im dumb")
	}
}
//DO
function goodFunc():Result<number,Error>{
	if(1+1 == 2){
		return Ok(2)
	}else{
		return Err(new Error("smarty pants"))
	}
}

```
Imagine, you didnt have to go read a giant function, or
boring documentation, to make sure the dope of a JS function
you about to use wont throw feacies (errors for monoglots) at 
you like a lab monkey. Thats why you use ts-results, or gtfo.

### DEPRECATED? - Splitting lines
#### The ,
When you split lines the split lines should start with , instead
of end with , .
example:
```Javascript
//not like this
const o={
	x:1,
	y:2,
	z:3
}
//like this
const o={
	x:1
	,y:2
	,z:3
}
```
It allows for a faster editing of those lines.
Im dead serious about this convention. When splitting lines, split thously or i'll split your head.
(PS: this is the haskell way, so at least i got the mathematicians on my lazy ass side)
#### DEPRECATED? - Chaining functions (about ;)
TLDR; Indent, and end chain with ;
example:
```Javascript
//DONT
x()
.y()
.z()
//DO
x()
	.y()
	.z();
```

Long, dont read:
When chaining functions , to end the sequence, this is to avoid
typescript from tripping over itself. Otherwise, referering back to
the policy of PRSS (productivity, readability, stability, speed), we
dont end lines with ; , because its not strictly needed, and saves us
1 keystroke. In terms of optimization, it runs slightly faster with ;,
but the typescript compiler handle that.

## Auto Formatting
We use prettifier

## Tests
### Setup

#### Mocks
##### channel
channels nammes must be lowercase and start with #.
example:
```
#iamacorrectlynamedchannel
```
### Expect
Should be written so that on unsuccesfull tests the error
message is printed by jest.
example:
```Javascript
//this
const cmdRes:Result<void,Error> = function()
expect(cmdRes).toBe(Ok.EMPTY)
//prints
/*
	ErrImpl {
	  "err": true,
	  "ok": false,
	  "val": [unauthorized error: user is not authorized],
*/
```
It prints like that on error because its comparing the whole structure,
which then includes the error in val.

Dont do this:
```
const cmdRes:Result<void,Error> = function()
expect(cmdRes.ok).toBe(true)
```
it will only print that it expected true, but got false. Which
isnt helpful to understand what error occured.

