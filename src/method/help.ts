import discordjs from "discord.js";
import discordapp from "../app";

import fs from "fs";
import path from "path";

/**
 * 도움말명령어입니다.
 */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	fs.readFile(
		path.resolve(__dirname, "../template/guide/main"),
		{
			encoding: "utf8"
		},
		(err, data) => {
			if (err) throw err;
			message.reply(data);
		}
	);
}