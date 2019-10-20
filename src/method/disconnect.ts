import discordjs from "discord.js";
import discordapp from "../app";

import { DiscordVoiceMapper } from "../define/DiscordInterface";

/** bot out voicechannel */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	// call message server id
	const serverId = message.guild.id;

	if (this.connectionMapper.has(serverId)) {
		const mapper = this.connectionMapper.get(serverId) as DiscordVoiceMapper;		
		mapper.connection.disconnect();
		this.connectionMapper.delete(serverId);
		message.channel.send("바위");
	}
};