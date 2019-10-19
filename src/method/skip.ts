/** */
import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper, getDispatcher, PlayFile } from "../lib/VoiceLib";
import { DiscordVoiceMapper } from "../define/DiscordInterface";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;

	// 봇 음성방 진입 여부
	if (mapper) {
		if (parseInt(args[0], 10)) {
			const x = parseInt(args[0], 10) < mapper.arrayQueueStack.length 
				? parseInt(args[0], 10) : mapper.arrayQueueStack.length;
			for(let i=0; i < x; i++)
				mapper.arrayQueueStack.shift();
		}
		const dispatcher = getDispatcher(mapper);
		if (dispatcher) dispatcher.end();
	}
}