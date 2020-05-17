import discordjs from "discord.js";
import discordapp from "../app";

import { isNaN } from "../Libs/Functions";

import { AudioInfo } from "../Defines/Common";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	const id = message.guild.id;

	if (this.validate(id)) {
		const mapper = this.connection(id);
		if (args.length) {
			const count = parseInt(args[0], 10);
			if (isNaN(count)) {
				const x = parseInt(args[0], 10) - 1 < mapper.arrayQueueStack.length 
					? parseInt(args[0], 10) - 1 : mapper.arrayQueueStack.length;
				for(let i=0; i < x; i++) {
					const Output = mapper.arrayQueueStack.shift();
					if (mapper.isQueueRepeat) mapper.arrayQueueStack.push(Output as AudioInfo);
				}
			} else {
				message.channel.send(this.template["errorInputNaturalNumber"]);
				return;
			}
		}
		const dispatcher = this.dispatcher(id);
		if (dispatcher) dispatcher.end();
	}
}