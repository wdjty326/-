import discordjs from "discord.js";

export type AudioInfo = {
	filePath: string;
	title: string;
};

export interface DiscordVoiceMapper {
	connection: discordjs.VoiceConnection;
	arrayQueueStack: Array<AudioInfo>;

	playingAudio?: AudioInfo;
	isLoop?: boolean;
}