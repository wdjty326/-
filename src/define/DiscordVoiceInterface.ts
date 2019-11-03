import discordjs from "discord.js";

import { AudioInfo } from "./CommonType";

/** discord voice connection infomation interface */
export default interface DiscordVoiceInfomation {
	/** VoiceConnection Session */
	connection: discordjs.VoiceConnection;

	/** current playing audio info */
	playingAudio: AudioInfo | null;
	/** playing audio queue list */
	arrayQueueStack: Array<AudioInfo>;

	/** queue loop playing ture/false */
	isQueueRepeat: boolean;

	checkVoiceMember: NodeJS.Timeout;
	checkPlayingAudio: NodeJS.Timeout;
}
