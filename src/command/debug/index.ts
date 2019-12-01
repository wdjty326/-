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
				case this.template.debugBox["set_type"]:
					set(message, reArgs);
					break;
				case this.template.debugBox["clean_type"]:
					clean(message, reArgs);
					break;
			}
		}
};