import discordjs from "discord.js";

export interface DiscordVoiceMapper {
	connection: discordjs.VoiceConnection;
	arrayQueueStack: string[];
}