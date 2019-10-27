import discordjs from "discord.js";
import discordapp from "../app";

import { getMapper } from "../lib/VoiceLib";

import { DiscordVoiceMapper } from "../define/DiscordInterface";

export default function(this: discordapp, message: discordjs.Message): void {
	// call message server id
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;
	if (mapper) {
		if (mapper.isLoop) {
			mapper.isLoop = false;
			message.channel.send("루프 정지");
		} else {
			mapper.isLoop = true;
			message.channel.send("루프 가동");
		}
	}
};
