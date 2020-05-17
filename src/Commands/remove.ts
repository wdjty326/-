import discordjs from "discord.js";
import discordapp from "../app";

import { isNaN } from "../Libs/Functions";

/**
 * queue 에 쌓인 목록을 제거합니다.
 * @param this 
 * @param message 
 * @param args 
 */
export default function(this: discordapp, message: discordjs.Message, args: string[]): void {
	const id = message.guild.id;

	if (this.validate(id)) {
		const obj = this.connection(id);
		if (args.length > 0) {
			const start = parseInt(args[0], 10);
			const count = (args.length === 2) ? parseInt(args[1], 10) : 1;
			
			if (!isNaN(start) || !isNaN(count)) {
				message.channel.send(this.template["errorInputNaturalNumber"]);
				return;
			}

			const removeList = obj.arrayQueueStack.splice(start - 1, count);
			message.channel.send(
				this.template["removeList"]
				+ "\n"
				+ removeList.map((audio) => audio.title).join("\n")
			);
		}
	}
};
