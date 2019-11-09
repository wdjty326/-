import discordjs from "discord.js";
import discordapp from "../app";

/* array QueueStack clear */
export default function(this: discordapp, message: discordjs.Message): void {
	// call message server id
	const id = message.guild.id;

	if (this.validate(id)) {
		const obj = this.connection(id);
		const dispatcher = this.dispatcher(id);

		// stack clear and dispatcher distory
		obj.arrayQueueStack.length = 0;
		// loop forced initialization
		if (obj.isQueueRepeat) obj.isQueueRepeat = false;
		if (dispatcher) dispatcher.end();
	}
};
