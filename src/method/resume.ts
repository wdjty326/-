/** */
import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper, getDispatcher } from "../lib/VoiceLib";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId);

	// 봇 음성방 진입 여부
	if (mapper) {
		const dispatcher = getDispatcher(mapper);
		if (dispatcher)	dispatcher.resume();
	}
}