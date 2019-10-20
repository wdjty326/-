import discordjs from "discord.js";
import discordapp from "../app";

/** bot in voicechannel */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	const { voiceChannel } = message.member;
	// call message server id
	const serverId = message.guild.id;
	// call user inner voice channel
	if (voiceChannel) {
		// checking connection infomation
		if (!this.connectionMapper.has(serverId)) {
			voiceChannel
			.join()
			.then((connection) => {
				this.connectionMapper.set(serverId, {
					connection,
					arrayQueueStack: []
				});
			})
			.catch((err) => message.reply(err.toString()));		
		} else {
			message.channel.send("나 누가이미불러서 바쁨 ㅅㄱ");	
		}
	} else {
		message.channel.send("님 어딨음? 음성방에 없는데??");
	}
};