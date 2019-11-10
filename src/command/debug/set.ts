import AudioOption from "../../option";
import discordjs from "discord.js";

export default function(message: discordjs.Message, args: string[]): void {
	if (args.length == 2) {
		const key = args[0];
		const value = args[1];

		switch(key) {
			case "bitrate":
				if (/^(32|48|64|96)$/g.test(value)) {
					AudioOption.getInstance().setAudioBitrate(
						parseInt(value, 10) as 32|48|64|96
					);
					message.channel.send("change audio bitrate");
				} else {
					message.channel.send("please audio bitrate value => 32|48|64|96");
				}
				break;
			case "frequency":
				if (/^(24000|48000)$/g.test(value)) {
					AudioOption.getInstance().setAudioFrequency(
						parseInt(value, 10) as 24000|48000
					);
					message.channel.send("change audio frequency");
				} else {
					message.channel.send("please audio bitrate value => 24000|48000");
				}
				break;
			case "passesbyte":
				if (!isNaN(parseInt(value, 10))) {
					AudioOption.getInstance().setPassesByte(
						parseInt(value, 10)
					);
					message.channel.send("change passes byte");
				} else {
					message.channel.send("please passes byte value => number");
				}
				break;
		}
	}
}