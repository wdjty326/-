import discordjs from "discord.js";
import discordapp from "../app";
import disconnect from "./disconnect";

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
					const checkVoiceMember = setInterval(() => {
						if (voiceChannel.members.size === 1) disconnect.call(this, message);
					}, 10000);

					const checkPlayingAudio = setInterval(() => {
						if(!this.connection(id).playingAudio) disconnect.call(this, message);	
					}, 600000);
					this.connectionMapper.set(id, {
						connection,
						arrayQueueStack: [],
						playingAudio: null,
						isQueueRepeat: false,

						checkVoiceMember,
						checkPlayingAudio
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