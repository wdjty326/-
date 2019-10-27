import discordjs from "discord.js";
import discordapp from "../app";

/** server ping check */
export default function(this: discordapp, message: discordjs.Message) {
	message.channel.send(`speed: ${this.client.ping}(ms)`);
};
