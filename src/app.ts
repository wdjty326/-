import discordjs from "discord.js";
import method from "./method";

import { DiscordVoiceMapper } from "./define/DiscordInterface";

/** command line startwith */
const CommandLine = "=";

/** discord main class. */
export default class DiscordApp {
	/** connect discord client. */
	protected client: discordjs.Client = new discordjs.Client();

	/** voice room connection mapper */
	protected connectionMapper: Map<string, DiscordVoiceMapper> = new Map();

	/** google api key */
	protected apikey: string = "";

	constructor(token: string, apikey: string) {	
		this.ready = this.ready.bind(this);
		this.message = this.message.bind(this);
		this.apikey = apikey;

		this.client.on("ready", this.ready);
		this.client.on("message", this.message);
		this.client.login(token).catch((reason) => {
			console.log(reason);
		});
	}

	/** login 이후 대기중일때 정보입니다. */
	ready() {
		console.log("READY LISTENER");
	}

	/** 메세지를 전달 받았을때 정보입니다. */
	message(message: discordjs.Message) {
		/** 텍스트 내용 */
		const { content } = message;
		if (content.startsWith(CommandLine)) {
			/** 시작명령어 */
			const params = content
				.substr(CommandLine.length)
				.split(" ");

			const exec = params[0].toLowerCase();
			const args = params.splice(1);
			if (exec in method) {
				method[exec].call(this, message, args);
			}
			else
				message.channel.send("=ㄷㅇ 으로 명령어 체크 바람");
		} else if (content.includes("자살"))
			message.channel.send("다시 한번 띵킹해보는 것이 어때?");
	}
}