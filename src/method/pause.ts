/** */
import discordjs from "discord.js";
import discordapp from "../app";
import { DiscordVoiceMapper } from "../define/DiscordInterface";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;

	// 봇 음성방 진입 여부
	if (this.connectionMapper.has(serverId)) {

		// 암튼 정지
		const mapper = this.connectionMapper.get(serverId) as DiscordVoiceMapper;
		mapper.dispatcher.pause();
	}
}