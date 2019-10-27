import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper } from "../lib/VoiceLib";
import { IsNaturalNumber } from "../lib/IntegerLib";

import { DiscordVoiceMapper } from "../define/DiscordInterface";
import { NaturalNumberException, RemoveMethodGuideContent } from "../template";

export default function(this: discordapp, message: discordjs.Message, args: string[]): void {
	// call message server id
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;

	if (mapper) {
		if (args.length > 0) {
			const start = parseInt(args[0], 10);
			const count = (args.length === 2) ? parseInt(args[1], 10) : 1;
			
			if (!IsNaturalNumber(start) || !IsNaturalNumber(count)) {
				message.channel.send(NaturalNumberException);
				return;
			}

			mapper.arrayQueueStack.splice(start - 1, count);
		} else {
			message.channel.send(RemoveMethodGuideContent);
		}
	}
};
