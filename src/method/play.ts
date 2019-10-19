import discordjs from "discord.js";
import discordapp from "../app";
import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";
import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";

import YoutubeDataAPI, { YoutubeDataAPIResponse } from "../lib/YoutubeDataAPI";
import { getMapper, getDispatcher, PlayStream } from "../lib/VoiceLib";
import { getURLParameter } from "../lib/StringLib";

type AsyncQueueType = {
	title: string;
	link: string;
	filePath: string;
};
const AsyncQueueStack: Array<AsyncQueueType> = [];
let flag = true;

const play = function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId);

	// 봇 음성방 진입 여부
	if (mapper && args.length) {
		let link: string = "";
		let v: string = "";		

		// callback
		const callback = (data: YoutubeDataAPIResponse) => {
			const title = data.items[0].snippet.title;
			const dirPaths = ["..", "music", serverId];
			let dirPath = path.resolve(__dirname);		
			dirPaths.forEach((dir) => {
				dirPath = path.resolve(dirPath, dir);
				if (!fs.existsSync(dirPath))	fs.mkdirSync(dirPath);
			});

			const filePath = path.resolve(dirPath, `${v}.mp3`);

			if (flag) {
				flag = false;
				const fileWriteStream = (title: string, link: string, filePath: string) => FileWriteStream(link, filePath).then((stream) => {
					const dispatcher = getDispatcher(mapper);
					if (dispatcher && !dispatcher.destroyed) {
						mapper.arrayQueueStack.push({
							title,
							filePath,
						});
					} else {
						PlayStream(mapper, stream);
					}
				}).catch((err: Error) => {
					message.reply(`[ERROR]${err.message}`);
				}).finally(() => {
					if (AsyncQueueStack.length) {
						const { title, link, filePath } = AsyncQueueStack.shift() as AsyncQueueType;
						fileWriteStream(title, link, filePath);
					} else {
						flag = true;
					}
				});
				fileWriteStream(title, link, filePath);
			} else {
				AsyncQueueStack.push({
					title,
					link,
					filePath,
				});
			}
		};
		// 유튜브 링크 검증
		if (/(youtu)\.?(be)?(\.com)?/g.test(args[0])) {
			// 유튜브 링크 처리
			link = args[0];
			if (link.indexOf("youtu.be") > 0) {
				const parameters = link.substr(link.lastIndexOf("/") + 1);
				link = `https://youtube.com/watch?v=${parameters}`;
			}
			const parameters = getURLParameter(link);
			v = parameters["v"];

			YoutubeDataAPI.Video({
				key: this.apikey,
				part: "id, snippet",
				id: parameters["v"]
			}).then(callback);
		} else {
			YoutubeDataAPI.Search({
				key: this.apikey,
				part: "id, snippet",
				q: encodeURI(args.join(" ")),
				maxResults: 1
			}).then((data) => {
				v = data.items[0].id.videoId;
				link = `https://youtube.com/watch?v=${v}`;
				callback(data);
			});
		}
	}
};

// 유튜브 link을 audio형식으로 저장합니다.
const FileWriteStream = (link: string, filePath: string) => new Promise<Readable>((resolve, reject) => {
	if (fs.existsSync(filePath)) {
		resolve(fs.createReadStream(filePath));
	}	else {
		try {
			const stream = ytdl(link);
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
	.withAudioBitrate("64k")
	.withAudioChannels(2)
	.withAudioFrequency(48000)
	.withAudioQuality(4)
	.outputFormat("mp3");

	
export default play;
