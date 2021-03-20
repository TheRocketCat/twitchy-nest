import { Result, Ok, Err, Option, Some, None } from 'ts-results';

//extracts strings and numbers into args
export function extractCommandArgs(cmd: string): Result<string[], Error> {
	try {
		const match = cmd.match(/[0-9]+|\".*\"|\'.*\'|[a-zA-Z]+/g).slice(1);
		if (match == null) {
			return Ok([]);
		} else if (match.length > 0) {
			for (let i = 0; i < match.length; i++) {
				match[i] = match[i].replace(/"/g, '');
				match[i] = match[i].replace(/'/g, '');
			}
			return Ok(match);
		} else return Ok([]);
	} catch (e) {
		return Err(e);
	}
}
