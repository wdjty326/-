import discordjs from "discord.js";
import discordapp from "../app";
import { DiscordVoiceMapper } from "../define/DiscordInterface";
import { getMapper, getDispatcher, PlayStream } from "../lib/VoiceLib";

import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";

import ffmpeg from "fluent-ffmpeg";

import { getURLParameter } from "../lib/StringLib";
import { Readable } from "stream";

let FfmpegAudioSync = true;
let FfmpegAudioSyncStack: any[] = [];

const play = function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId);

	// 봇 음성방 진입 여부
	if (mapper) {
		// 파일 싱크
		if (FfmpegAudioSync) {
			FfmpegAudioSync = false;

			// 파라미터 검증
			if (!args[0]) {
				message.reply("노래는 알려줘야 부를꺼아니냐");
				return;
			}

			// 유튜브 링크 검증
			if (!/(youtu)\.?(be)?(\.com)?/g.test(args[0])) {
				message.reply("유튜브 링크로 줘");
				return;
			}

			// 유튜브 링크 처리
			let link = args[0];
			if (link.indexOf("youtu.be") > 0) {
				const parameters = link.substr(link.lastIndexOf("/") + 1);
				link = `https://youtube.com/watch?v=${parameters}`;
			}

			const parameters = getURLParameter(link);

			// 정상적인 유튜브 링크가 아닐시
			if (!parameters["v"]) {
				message.reply("링크 제대로 준거 맞아?");
				return;	
			}

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
			}).finally(() => {
				FfmpegAudioSync = true;
				if (FfmpegAudioSyncStack.length) {
					const FfmpegAudioParam = FfmpegAudioSyncStack.shift();
					play.apply(this, FfmpegAudioParam);
				}
			});
		} else {
			FfmpegAudioSyncStack.push([message, args]);
		}
	} else {
		message.reply("음성방 들어가면 불러줄게");
	}
};

// 유튜브 link을 audio형식으로 저장합니다.
const FileWriteStream = (link: string, filePath: string) => new Promise<Readable>((resolve, reject) => {
	if (fs.existsSync(filePath)) {
		resolve(fs.createReadStream(filePath));
	}	else {
		try {
			// ffmpeg 를 사용하여 mp4 를 mp3 코텍으로 변경합니다.
			FfmpegAudio(link)
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
const FfmpegAudio = (link: string) => ffmpeg({
		source: ytdl(link, {
			filter: (format) => format.container === "mp4"
		}),
		timeout: 10
	})
	.withNoVideo()
	.withAudioBitrate(96)
	.withAudioChannels(2)
	.withAudioFrequency(48000)
	.withAudioQuality(5)
	.fromFormat("mp4")
	.outputFormat("mp3");

	
export default play;
