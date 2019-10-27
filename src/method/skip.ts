/** */
import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper, getDispatcher } from "../lib/VoiceLib";
import { IsNaturalNumber } from "../lib/IntegerLib";

import { AudioInfo, DiscordVoiceMapper } from "../define/DiscordInterface";
import { NaturalNumberException } from "../template";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;

	// 봇 음성방 진입 여부
	if (mapper) {
		if (args.length) {
			const count = parseInt(args[0], 10);
			if (IsNaturalNumber(count)) {
				const x = parseInt(args[0], 10) - 1 < mapper.arrayQueueStack.length 
					? parseInt(args[0], 10) - 1 : mapper.arrayQueueStack.length;
				for(let i=0; i < x; i++) {
					const Output = mapper.arrayQueueStack.shift();
					if (mapper.isLoop) mapper.arrayQueueStack.push(Output as AudioInfo);
				}
			} else {
				message.channel.send(NaturalNumberException);
				return;
			}
		}
		const dispatcher = getDispatcher(mapper);
		if (dispatcher) dispatcher.end();
	}
}