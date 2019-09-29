import discordjs from "discord.js";
import discordapp from "../app";

/**
 * ping을 가져옵니다.
 * 
 * bind를 사용하여 DiscordApp 객체를 넘겨주어야합니다.
 */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	message.reply(`[DEBUG]응답속도 : ${this.client.ping}(ms)`);
};
