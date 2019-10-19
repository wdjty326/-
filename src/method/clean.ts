import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper, getDispatcher } from "../lib/VoiceLib";

import { DiscordVoiceMapper } from "../define/DiscordInterface";

/* array QueueStack clear */
export default function(this: discordapp, message: discordjs.Message, args?: string[]): void {
	// call message server id
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;

	if (mapper) {
		const dispatcher = getDispatcher(mapper);

		// stack clear and dispatcher distory
		mapper.arrayQueueStack.length = 0;
		if (dispatcher) dispatcher.end();
	}
};
