import AudioOption from "../../option";
import discordjs from "discord.js";

import rimraf from "rimraf";
import path from "path";
import fs from "fs";

export default function(message: discordjs.Message, args: string[]): void {
	const id = (args.length) ? args[0] : message.guild.id;

	if (id) {
		const dirPath = path.resolve(AudioOption.getInstance().getMusicDir(), id);

		if (fs.existsSync(dirPath)) {
			console.log("debug clean path:", dirPath);
			rimraf.sync(dirPath);
			message.channel.send("remove music dir");
		}
	}
}