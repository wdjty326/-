import discordapp from "../app";
import { DiscordVoiceMapper } from "../define/DiscordInterface";
import { StreamDispatcher } from "discord.js";
import { Readable } from "stream";

import fs from "fs";

/** discordapp의 connectionMapper에서 DiscordVoiceMapper 정보를 가져옵니다. */
export const getMapper = function(this: discordapp, serverId: string): DiscordVoiceMapper | null {
	return (this.connectionMapper.has(serverId)) ? this.connectionMapper.get(serverId) as DiscordVoiceMapper : null;
};

/** mapper에서 dispatcher를 가져옵니다. */
export const getDispatcher = (mapper: DiscordVoiceMapper): StreamDispatcher => mapper.connection.dispatcher;

/** 경로에 있는 파일을 재생합니다. */
export const PlayFile = (mapper: DiscordVoiceMapper, path: string) => PlayStream(mapper, fs.createReadStream(path));

/** stream정보를 재생합니다. */
export const PlayStream = (mapper: DiscordVoiceMapper, stream: Readable) => (({ connection, arrayQueueStack } = mapper) => connection.playStream(stream, {
	seek: 0,
	volume: 1
}).on("end", (reason) => {
	console.log("reason:",reason);

	if (arrayQueueStack.length) {
		const filePath = arrayQueueStack.shift() as string;
		console.log("arrayQueueStack out:", filePath);

		const stream = fs.createReadStream(filePath);
		PlayStream(mapper, stream);
	}
}))();