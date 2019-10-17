import discordjs from "discord.js";
import discordapp from "../app";
import { getMapper, getDispatcher, PlayStream } from "../lib/VoiceLib";
import { YoutubeVideos } from "../define/DiscordInterface";

import axios from "axios";

import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";

import ffmpeg from "fluent-ffmpeg";

import { getURLParameter, SerializeGet } from "../lib/StringLib";
import { Readable } from "stream";

const play = function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId);

	// 봇 음성방 진입 여부
	if (mapper && args.length) {
		// 유튜브 링크 검증
		if (!/(youtu)\.?(be)?(\.com)?/g.test(args[0])) {
			message.reply("[디버그메세지]유튜브 링크만 허용합니다.");
			return;
		}

		// 유튜브 링크 처리
		let link = args[0];
		if (link.indexOf("youtu.be") > 0) {
			const parameters = link.substr(link.lastIndexOf("/") + 1);
			link = `https://youtube.com/watch?v=${parameters}`;
		}

		const parameters = getURLParameter(link);

		axios.get(`https://www.googleapis.com/youtube/v3/videos?${SerializeGet({
			key: this.apikey,
			part: "id, snippet",
			id: parameters["v"]
		})}`).then((response) => {
			if ("items" in response.data && response.data.items.length) {
				const data: YoutubeVideos = response.data;

				const dirPaths = ["..", "music", serverId];
				let dirPath = path.resolve(__dirname);		
				dirPaths.forEach((dir) => {
					dirPath = path.resolve(dirPath, dir);
					if (!fs.existsSync(dirPath))	fs.mkdirSync(dirPath);
				});

				const filePath = path.resolve(dirPath, `${parameters["v"]}.mp3`);
				FileWriteStream(link, filePath).then((stream) => {
					const dispatcher = getDispatcher(mapper);
					if (dispatcher && !dispatcher.destroyed) {
						mapper.arrayQueueStack.push(filePath);
					} else {
						PlayStream(mapper, stream);
					}
				}).catch((err: Error) => {
					message.reply(`[ERROR]${err.message}`);
				});
			} else {
				message.reply("[디버그메세지]");
			}
		});
	}
};

// 유튜브 link을 audio형식으로 저장합니다.
const FileWriteStream = (link: string, filePath: string) => new Promise<Readable>((resolve, reject) => {
	if (fs.existsSync(filePath)) {
		resolve(fs.createReadStream(filePath));
	}	else {
		try {
			const stream = ytdl(link, {	filter: "audio" });
			// ffmpeg 를 사용하여 mp4 를 mp3 코텍으로 변경합니다.
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

// ffmpeg 오디오 처리 함수
const FfmpegAudio = (stream: Readable) => ffmpeg()
    .input(stream)
    .audioFilters([
    {
      filter: 'volume',
      options: '0.5'
    },
    {
      filter: 'silencedetect',
      options: 'n=-50dB:d=5'
    }
  ])
	.audioCodec("libmp3lame")
	.withNoVideo()
	.withAudioBitrate("96k")
	.withAudioChannels(2)
	.withAudioFrequency(48000)
	.withAudioQuality(5)
	.outputFormat("mp3");

	
export default play;
