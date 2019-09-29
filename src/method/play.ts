import discordjs from "discord.js";
import discordapp from "../app";

import ytdl from "ytdl-core";
const streamOptions = { seek: 0, volume: 1 };
export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	if (this.connect) {
		if (args[0]) {
			console.log(args[0]);
			const stream = ytdl(args[0], { filter : 'audioonly' });

			// stream.on("end", function(this: discordapp) {
			// 	this.connect.playStream(stream, streamOptions);
			// }.bind(this));
			console.log("노래틈", this.connect.channel.id, this.connect.status);
		} else {
			message.reply("뭔노래틀게?");	
		}
	} else {
		message.reply("방부터 들어가자");
	}
}