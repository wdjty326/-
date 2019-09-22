/** 상수 */
const DefineConst = require("./Defines/Const");

const discordjs = require("discord.js");

/** discord 메인 클래스입니다. */
module.exports.Discord = class DiscordApp {
	constructor(token) {
		/** 연결할 디스코드 클라이언트 입니다. */
		this.client = new discordjs.Client();

		this.ready = this.ready.bind(this);
		this.message = this.message.bind(this);

		if (this.client) {
			this.client.on("ready", this.ready);
			this.client.on("message", this.message);

			this.client.login(token);
		}
	}

	ready() {
		console.log("[DEBUG]READY");
	}

	message(message) {
		/** 텍스트 내용 */
		const { content } = message;
		if (content.startsWith(DefineConst.cmd)) {
			/** 시작명령어 */
			const exec = content.substr(DefineConst.cmd.length);
			switch(exec) {
				case "ping":
					message.reply(`[DEBUG]응답속도 : ${this.client.ping}(ms)`);
					break;
				default:
					// console.log(message);
					// message.reply("뭐라는거임?");
			}
		}
	}
}