import { InfoCommandService } from '../info-command.service';

export class TwitchService {
	constructor(private infoCommandService: InfoCommandService) {}

	y() {
		console.log('Y');
	}

	create(data: any) {
		//validates data
		//validates authority of user
		//executes corresponding function
		//emits a event for writing back to the chat / user
		//return this.infoCommandService.create()
	}
}
