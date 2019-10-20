import discordjs from "discord.js";
import discordapp from "../app";
import { getMapper } from "../lib/VoiceLib";

import { DiscordVoiceMapper } from "../define/DiscordInterface";

export default function(this: discordapp, message: discordjs.Message, args?: string[]): void {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;

	// 봇 음성방 진입 여부
	if (mapper) {
		message.channel.send(
			"대기목록\n" 
			+ mapper.arrayQueueStack.map((Output, Index) => `${Index + 1}. ${Output.title}`).join("\n")
		);
	}
};
