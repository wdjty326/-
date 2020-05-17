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
					}, 60000);

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

					message.channel.send(this.template["connectionMsg"]);	
					if (typeof callback === "function") callback();
				}
			})
			.catch((err) => message.channel.send(err.toString()));		
		} else {
			message.channel.send(this.template["errorAwaitVoiceChannel"]);	
		}
	} else {
		message.channel.send(this.template["errorNotFountVoiceChannel"]);
	}
};