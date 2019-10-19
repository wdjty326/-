import discordjs from "discord.js";
import discordapp from "../app";

export default function(this: discordapp, message: discordjs.Message, args?: string[]): void {
	// Taekyu << developer name
	const list = [
		"TAEKYU is cute '3'",
		"TAEKYU はかわいい。 +.+",
		"택유는 귀엽습니다."
	]
	message.reply(list[Math.floor(Math.random() * 10 % 3)]);
};
