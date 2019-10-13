import discordjs from "discord.js";
import discordapp from "../app";

import { DiscordVoiceMapper } from "../define/DiscordInterface";

/** 봇이 음성방에서 퇴장합니다. */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;

	if (this.connectionMapper.has(serverId)) {
		const mapper = this.connectionMapper.get(serverId) as DiscordVoiceMapper;		
		mapper.connection.disconnect();
		this.connectionMapper.delete(serverId);
		message.reply("바위");
	}
};