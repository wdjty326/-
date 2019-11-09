import discordjs from "discord.js";
import discordapp from "../app";

export default function(this: discordapp, message: discordjs.Message) {
	const id = message.guild.id;

	if (this.validate(id)) {
		const dispatcher = this.dispatcher(id);
		if (dispatcher)	dispatcher.resume();
	}
}