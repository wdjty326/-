import discordjs from "discord.js";

export interface DiscordVoiceMapper {
	connection: discordjs.VoiceConnection;
	dispatcher: discordjs.StreamDispatcher;
	arrayQueueStack: string[];
}