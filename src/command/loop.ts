import discordjs from "discord.js";
import discordapp from "../app";

export default function(this: discordapp, message: discordjs.Message): void {
	// call message server id
	const id = message.guild.id;
	
	if (this.validate(id)) {
		const obj = this.connection(id);
		if (obj.isQueueRepeat) {
			obj.isQueueRepeat = false;
			message.channel.send(this.template["stopQueue"]);
		} else {
			obj.isQueueRepeat = true;
			message.channel.send(this.template["startQueue"]);
		}
	}
};
