import discordjs from "discord.js";
import discordapp from "../app";

/** bot out voicechannel */
export default function(this: discordapp, message: discordjs.Message) {
	// call message server id
	const id = message.guild.id;
	
	if (this.validate(id)) {
		const obj = this.connection(id);

		if (obj.checkVoiceMember) clearInterval(obj.checkVoiceMember);
		if (obj.checkPlayingAudio) clearInterval(obj.checkPlayingAudio); 

		if (obj.connection.dispatcher) obj.connection.dispatcher.end();
		obj.connection.disconnect();

		this.delete(id);

		message.channel.send(this.localeContent["disconnectMsg"])
	}
};