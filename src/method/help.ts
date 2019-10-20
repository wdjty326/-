import discordjs from "discord.js";
import discordapp from "../app";
import { MainGuideContent } from "../template";

/** help */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	message.channel.send(MainGuideContent);
}