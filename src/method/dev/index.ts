// 개발자용
import discordjs from "discord.js";
import discordapp from "../../app";
import fs from "fs";
import path from "path";
import { getMapper, getDispatcher, PlayStream } from "../../lib/VoiceLib";

import { DiscordVoiceMapper } from "../../define/DiscordInterface";

export default function(this: discordapp, message: discordjs.Message, args?: string[]): void {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId) as DiscordVoiceMapper | null;
	
	if (mapper)
		if (args) {
			switch(args[0]) {
				case "song":
					const filePath = path.resolve(__dirname, "..", "dev", "song", `${args[1]}.m4a`);
					const stream = fs.createReadStream(filePath);
					if (stream.readable) {
						const dispatcher = getDispatcher(mapper);
						if (dispatcher && !dispatcher.destroyed) {
							mapper.arrayQueueStack.push({
								title: args[1],
								filePath
							});
						} else {
							PlayStream(mapper, stream);
						}
					}
					break;
				case "comment":
					message.channel.send("prepare");
					break;
			}
		} else {
			message.channel.send("=ㄷㅇ dev");
		}
};
