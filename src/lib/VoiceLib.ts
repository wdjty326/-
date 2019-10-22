import discordapp from "../app";
import { AudioInfo, DiscordVoiceMapper } from "../define/DiscordInterface";
import { StreamDispatcher } from "discord.js";
import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
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
export const PlayStream = (mapper: DiscordVoiceMapper, stream: Readable) => (({ connection, arrayQueueStack, currentAudioInfo } = mapper) => connection.playStream(stream, {
	seek: 0,
	volume: 1,
	bitrate: 44100
}).on("end", () => {
	// 루프가 실행중이므로 완료된 노래를 뒤로 보낸다.
	if (mapper.isLoop) arrayQueueStack.push(currentAudioInfo as AudioInfo);

	if (arrayQueueStack.length) {
		const Output = arrayQueueStack.shift();
		if (Output) {
			console.log("arrayQueueStack Output:", Output);
			const stream = fs.createReadStream(Output.filePath);
			mapper.currentAudioInfo = Output
			PlayStream(mapper, stream);
		}
	}
}).on("error", (err) => {
	const dispatcher = getDispatcher(mapper);
	if (dispatcher) dispatcher.end();

	console.log("ERROR:", err.message);
}))();


// youtube link for audio type save
export const FileWriteStream = (link: string, filePath: string) => new Promise<Readable>((resolve, reject) => {
	if (fs.existsSync(filePath)) {
		resolve(fs.createReadStream(filePath));
	}	else {
		try {
			const stream = ytdl(link, {
				filter: "audio",
				quality: "highestaudio"
			});
			// use ffmpeg convert mp3
			FfmpegAudio(stream)
			.on("error", (err) => {
				if (typeof err === "string")	reject(new Error(err));
				else	reject(err);
			})
			.on("end", () => {
				resolve(fs.createReadStream(filePath));
			})
			.pipe(fs.createWriteStream(filePath));
		} catch (err) {
			if (typeof err === "string")	reject(new Error(err));
			else	reject(err);
		}
	}
});

// ffmpeg audio setting function
const FfmpegAudio = (stream: Readable) => ffmpeg()
	.input(stream)
	.audioFilters([
    {
      filter: "volume",
      options: "0.5"
    },
    {
      filter: "silencedetect",
      options: "n=-50dB:d=5"
    }
  ])
	.audioCodec("libmp3lame")
	.withNoVideo()
	.withAudioBitrate("96k")
	.withAudioChannels(2)
	.withAudioFrequency(44100)
	.withAudioQuality(5)
	.outputFormat("mp3");