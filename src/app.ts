import discordjs from "discord.js";
import method from "./method";

import { DiscordVoiceMapper } from "./define/DiscordInterface";

/** 커맨드의 시작라인입니다. */
const CommandLine = "!=";

/** discord 메인 클래스입니다. */
export default class DiscordApp {
	/** 연결할 디스코드 클라이언트 입니다. */
	protected client: discordjs.Client = new discordjs.Client();

	/** 음성 연결방 클라이언트 */
	protected connectionMapper: Map<string, DiscordVoiceMapper> = new Map();

	constructor(token: string) {	
		this.ready = this.ready.bind(this);
		this.message = this.message.bind(this);

		this.client.on("ready", this.ready);
		this.client.on("message", this.message);

		this.client.login(token).catch((reason) => {
			console.log(reason);
		});
	}

	/** login 이후 대기중일때 정보입니다. */
	ready() {
		console.log("[DEBUG]READY");
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
				message.reply("[DEBUG]불러오지못한명령어");
		}
	}
}