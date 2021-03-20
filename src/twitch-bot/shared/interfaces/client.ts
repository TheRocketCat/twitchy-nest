export interface IClient {
	say(channel: string, message: string): Promise<[string]>;
	whisper(username: string, message: string): Promise<[string, string]>;
}
