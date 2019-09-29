import discordjs from "discord.js";
import discordapp from "../app";

/** 봇이 음성방에서 퇴장합니다. */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	if (this.connect) {
		this.connect.disconnect();
		this.connect = null;

		message.reply("바위");
	}
};