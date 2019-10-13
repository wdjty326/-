import discordjs from "discord.js";
import discordapp from "../app";
import { DiscordVoiceMapper } from "../define/DiscordInterface";

import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";

import ffmpeg from "fluent-ffmpeg";

import { getURLParameter } from "../lib/StringLib";
import { Readable } from "stream";

const StreamOption = {
	seek: 0,
	volume: 1
};

export default function(this: discordapp, message: discordjs.Message, args: string[]) {
	// 호출 메세지의 서버 ID
	const serverId = message.guild.id;

	// 봇 음성방 진입 여부
	if (this.connectionMapper.has(serverId)) {
		const mapper = this.connectionMapper.get(serverId) as DiscordVoiceMapper;
		const { connection } = mapper;
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
		new Promise<Readable>((resolve, reject) => {
			if (fs.existsSync(filePath)) {
				resolve(fs.createReadStream(filePath));
			}	else {
				try {
					// ffmpeg 를 사용하여 mp4 를 mp3 코텍으로 변경합니다.
					ffmpeg({
						source: ytdl(link, {
							filter: (format) => format.container === "mp4"
						}),
						timeout: 10
					})
					.withNoVideo()
					.withAudioBitrate(128)
					.withAudioChannels(2)
					.withAudioFrequency(48000)
					.withAudioQuality(5)
					.fromFormat("mp4")
					.outputFormat("mp3")
					.on("error", (err) => {
						if (typeof err === "string")	new Error(err);
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
		}).then((stream) => {
			if (mapper.dispatcher && !mapper.dispatcher.destroyed) {
				mapper.arrayQueueStack.push(filePath);
			} else {
				const dispatcher = connection.playStream(stream, StreamOption);
				dispatcher.on("end", () => {
					if (mapper.arrayQueueStack.length > 0)
						mapper.dispatcher = connection.playStream(fs.createReadStream(filePath), StreamOption);
				});
				mapper.dispatcher = connection.playStream(stream, StreamOption);
			}
		}).catch((err: Error) => {
			message.reply(`[ERROR]${err.message}`);	
		});
	} else {
		message.reply("음성방 들어가면 불러줄게");
	}
}