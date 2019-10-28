import discordjs from "discord.js";
import discordapp from "../app";

import { IsNaturalNumber } from "../lib/IntegerLib";

import { NaturalNumberException, RemoveMethodGuideContent } from "../template";

export default function(this: discordapp, message: discordjs.Message, args: string[]): void {
	// call message server id
	const id = message.guild.id;

	if (this.validate(id)) {
		const obj = this.connection(id);
		if (args.length > 0) {
			const start = parseInt(args[0], 10);
			const count = (args.length === 2) ? parseInt(args[1], 10) : 1;
			
			if (!IsNaturalNumber(start) || !IsNaturalNumber(count)) {
				message.channel.send(NaturalNumberException);
				return;
			}

			obj.arrayQueueStack.splice(start - 1, count);
		} else {
			message.channel.send(RemoveMethodGuideContent);
		}
	}
};
