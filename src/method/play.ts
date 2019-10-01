import discordjs from "discord.js";
import discordapp from "../app";

import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	if (this.connect) {
		// const stream = ytdl(args[0], { filter : 'audioonly' });
		
		const stream = fs.createReadStream(path.resolve(__dirname, "music", "Labyrinth.mp3"))
		// const stream = ytdl(args[0], { filter : 'audioonly' });
		this.connect.playStream(stream);
		if (args[0]) {
			
			// stream.on("end", function(this: discordapp) {
			// 	this.connect.playStream(stream, streamOptions);
			// }.bind(this));
		} else {
			message.reply("뭔노래틀게?");	
		}
	} else {
		message.reply("방부터 들어가자");
	}
}