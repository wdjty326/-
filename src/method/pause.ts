import discordjs from "discord.js";
import discordapp from "../app";

/** pause music */
export default function(this: discordapp, message: discordjs.Message) {
	// call message server id
	const id = message.guild.id;

	if (this.validate(id)) {
		const dispatcher = this.dispatcher(id);
		if (dispatcher)	dispatcher.pause();
	}
}