import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper, getDispatcher } from "../lib/VoiceLib";

import { DiscordVoiceMapper } from "../define/DiscordInterface";

/* array QueueStack clear */
export default function(this: discordapp, message: discordjs.Message): void {
	// call message server id
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;

	if (mapper) {
		const dispatcher = getDispatcher(mapper);

		// stack clear and dispatcher distory
		mapper.arrayQueueStack.length = 0;
		// loop forced initialization
		if (mapper.isLoop) mapper.isLoop = false;
		if (dispatcher) dispatcher.end();
	}
};
