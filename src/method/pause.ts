import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper, getDispatcher } from "../lib/VoiceLib";

/** pause music */
export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	// call message server id
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId);

	if (mapper) {
		const dispatcher = getDispatcher(mapper);
		if (dispatcher)	dispatcher.pause();
	}
}