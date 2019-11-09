import discordjs from "discord.js";
import discordapp from "../app";

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	if (args.length) {
        switch(args[0]) {
            case "ko":
                message.channel.send("ko");
                this.setLocale(args[0]);
                break;
            default:
                message.channel.send("ko");
        }
    }
}