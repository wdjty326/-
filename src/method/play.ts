import discordjs from "discord.js";
import discordapp from "../app";

import ytdl from "ytdl-core";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	if (this.connect) {
		const stream = ytdl(args[0], { filter : 'audioonly' });
		const broadcast = this.client.createVoiceBroadcast();
		broadcast.playStream(stream);
		const dispatcher = this.connect.playBroadcast(broadcast);
		dispatcher.setVolumeLogarithmic(100);
	} else {
		message.reply("방부터 들어가자");
	}
}