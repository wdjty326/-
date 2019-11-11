import discordjs from "discord.js";
import discordapp from "../../app";

import set from "./set";
import clean from "./clean";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	if (message.member.id === this.debugkey)
		if (args.length) {
			const command = args[0];
			const reArgs = args.slice(1);

			switch(command) {
				case "set":
					set(message, reArgs);
					break;
				case "clean":
					clean(message, reArgs);
					break;
			}
		}
	else
		message.channel.send("you not tester");
};