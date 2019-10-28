import discordjs from "discord.js";
import discordapp from "../app";

/** bot in voicechannel */
export default function(this: discordapp, message: discordjs.Message, callback?: () => void) {
	const { voiceChannel } = message.member;
	// call message server id
	const id = message.guild.id;
	// call user inner voice channel
	if (voiceChannel) {
		// checking connection infomation
		if (!this.validate(id)) {
			voiceChannel
			.join()
			.then((connection) => {
				if (connection.status === 0) {
					this.connectionMapper.set(id, {
						connection,
						arrayQueueStack: [],
						playingAudio: null,
						isQueueRepeat: false
					});

					if (typeof callback === "function") callback();
				}
			})
			.catch((err) => message.reply(err.toString()));		
		} else {
			message.channel.send("나 누가이미불러서 바쁨 ㅅㄱ");	
		}
	} else {
		message.channel.send("님 어딨음? 음성방에 없는데??");
	}
};