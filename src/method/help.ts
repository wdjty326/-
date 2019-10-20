import discordjs from "discord.js";
import discordapp from "../app";
import { MainGuideContent, DevGuideContent } from "../template";

/** help */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	if (args && args[0] === "dev") {
		message.channel.send(DevGuideContent);
	} else {
		message.channel.send(MainGuideContent);
	}
}