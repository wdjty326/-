import discordjs from "discord.js";
import discordapp from "../app";

/** help */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	message.channel.send(this.template["guide"]);
}