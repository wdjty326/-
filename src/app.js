const discordjs = require("discord.js");

/** discord 메인 클래스입니다. */
exports.DiscordApp = class DiscordApp {
	/** 연결할 디스코드 클라이언트 입니다. */
	client = null;
	constructor(token) {
		this.client = new discordjs.Client();
		if (this.client) {
			client.on("ready", this.ready);
			client.on("message", this.message);

			client.login(token);
		}
	}

	ready() {
		console.log("[DEBUG]Ready");
	}

	message(message) {
		switch(message) {
			case "ping":
				message.reply(client.ping);
				break;
			default:
				message.reply("뭐라는거임?");
		}
	}
}