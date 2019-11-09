import { StreamOptions } from "discord.js";
import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import fs from "fs";

import { AudioInfo } from "../define/CommonType";
import DiscordVoiceInfomation from "../define/DiscordVoiceInterface";

export const PlayOptions = (size = 0, byte = 4096): StreamOptions => {
	const passes = Math.round(size / byte);
	return {
		seek: 0,
		volume: 1,
		passes: passes ? passes : 1,
		bitrate: 44100
	};
} ;

/** 경로에 있는 파일을 재생합니다. */
export const PlayFile = (obj: DiscordVoiceInfomation, path: string, option: StreamOptions = PlayOptions()) => PlayStream(obj, fs.createReadStream(path), option);

/** stream정보를 재생합니다. */
export const PlayStream = (obj: DiscordVoiceInfomation, stream: Readable, option: StreamOptions = PlayOptions()) => {
	const { connection, arrayQueueStack, playingAudio } = obj;
	connection.playStream(stream, option).on("end", () => {
		console.log("end playstream");
		// loop
		if (obj.isQueueRepeat) arrayQueueStack.push(playingAudio as AudioInfo);
	
		if (arrayQueueStack.length) {
			const Output = arrayQueueStack.shift();
			if (Output) {
				const stream = fs.createReadStream(Output.filePath);
				obj.playingAudio = Output;
				PlayStream(obj, stream, PlayOptions(getFileSize(Output.filePath)));
			}
		} else {
			obj.playingAudio = null;
		}
	}).on("error", (err) => {
		const dispatcher = obj.connection.dispatcher;
		// loop forced initialization
		if (obj.isQueueRepeat) obj.isQueueRepeat = false;

		if (dispatcher)	dispatcher.end();
		console.log(err.message);
	});
}

export const getFileSize = (filePath: string) => {
	const stat = fs.statSync(filePath);
	return stat.isFile() ? stat.size : 0;
};

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
	.withNoVideo()
	.audioCodec("libvorbis")
	.withAudioBitrate(96)
	.withAudioChannels(2)
	.withAudioFrequency(44100)
	.withAudioQuality(2)
	.outputFormat("ogg");