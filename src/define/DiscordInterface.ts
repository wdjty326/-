import discordjs from "discord.js";

export interface DiscordVoiceMapper {
	connection: discordjs.VoiceConnection;
	arrayQueueStack: Array<{
		filePath: string;
		title: string;
	}>;
}