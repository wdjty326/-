import discordjs from "discord.js";
import discordapp from "../app";

/** 봇이 음성방에서 퇴장합니다. */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	const { voiceChannel } = message.member;
	// 호출한상대가 채널방에 들어와있는지 체크합니다.
	if (voiceChannel) {
		// 이미 다른방에 들어와있는지 확인합니다.
		if (!this.connect) {
			voiceChannel
				.join()
				.then((connect) => this.connect = connect)
				.catch((err) => message.reply(err.toString()));
		} else {
			message.reply("나 누가이미불러서 바쁨 ㅅㄱ");	
		}
	} else {
		message.reply("님 어딨음? 음성방에 없는데??");
	}
};