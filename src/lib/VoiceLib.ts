import { StreamOptions } from "discord.js";
import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import fs from "fs";

import { AudioInfo } from "../define/CommonType";
import DiscordVoiceInfomation from "../define/DiscordVoiceInterface";

export const InitialPlayOptions: StreamOptions = {
	seek: 0,
	volume: 1,
	passes: 1,
	bitrate: 48000
};

/** 경로에 있는 파일을 재생합니다. */
export const PlayFile = (obj: DiscordVoiceInfomation, path: string, option: StreamOptions = InitialPlayOptions) => PlayStream(obj, fs.createReadStream(path), option);

/** stream정보를 재생합니다. */
export const PlayStream = (obj: DiscordVoiceInfomation, stream: Readable, option: StreamOptions = InitialPlayOptions) => {
	const { connection, arrayQueueStack, playingAudio } = obj;
	stream.on("end", () => {
		console.log("end stream");
	});
	connection.playStream(stream, option).on("end", () => {
		console.log("end playstream");
		// loop
		if (obj.isQueueRepeat) arrayQueueStack.push(playingAudio as AudioInfo);
	
		if (arrayQueueStack.length) {
			const Output = arrayQueueStack.shift();
			if (Output) {
				// 1 second delay
				setTimeout(() => {
					const stream = fs.createReadStream(Output.filePath);
					const size = getFileSize(Output.filePath);

					obj.playingAudio = Output
					PlayStream(obj, stream, {
						...option,
						...{
							passes: Math.round(size / 2048)
						}
					});
				}, 1000);
			}
		} else {
			connection.dispatcher.stream.destroy();
			obj.playingAudio = null;
		}
	}).on("error", (err) => {
		const dispatcher = obj.connection.dispatcher;
		// loop forced initialization
		if (obj.isQueueRepeat) obj.isQueueRepeat = false;

		if (dispatcher) {
			if (dispatcher.stream) dispatcher.stream.destroy();
			dispatcher.end();
		}
		console.log(err.message);
	});
}

export const getFileSize = (filePath: string) => fs.statSync(filePath).size;

// youtube link for audio type save
export const FileWriteStream = (link: string, filePath: string) => new Promise<Readable>((resolve, reject) => {
	if (fs.existsSync(filePath)) {
		resolve(fs.createReadStream(filePath));
	}	else {
		try {
			const stream = ytdl(link);
			// use ffmpeg convert mp3
			FfmpegAudio(stream)
			.on("error", (err) => {
				if (typeof err === "string")	reject(new Error(err));
				else	reject(err);
			})
			.on("end", () => {
				resolve(
					fs.createReadStream(filePath)
				);
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
	.audioCodec("libmp3lame")
	.withNoVideo()
	.withAudioBitrate(96)
	.withAudioChannels(2)
	.withAudioFrequency(48000)
	.withAudioQuality(5)
	.outputFormat("mp3");