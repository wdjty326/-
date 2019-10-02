import discordjs from "discord.js";
import discordapp from "../app";

import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";

import ffmpeg from "ffmpeg";

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
		const connection = this.connectionMapper.get(serverId) as discordjs.VoiceConnection;
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
		const dirPath = path.resolve(__dirname, "..", "music", serverId);
		const filePath = path.resolve(dirPath, `${parameters["v"]}.mp4`);

		if (!fs.existsSync(dirPath))	fs.mkdirSync(dirPath, {
			recursive: true
		});

		// `${parameters["v"]}.mp3`
		console.log(link);
		new Promise<Readable>((resolve, reject) => {
			console.log("Promise");
			if (fs.existsSync(filePath))
				resolve(fs.createReadStream(filePath));
			else
				try {
					const buffer = fs.createWriteStream(filePath);
					const stream = ytdl(link).pipe(buffer);
					stream.end(() => {
						new ffmpeg(filePath).then((video) => {
							
						});
						resolve(fs.createReadStream(filePath));
					});
				} catch (e) {
					message.reply(`[ERROR]${e}`);
					console.log(e);
				}

		}).then((stream) => {
			connection.playStream(stream, StreamOption);
		});
	} else {
		message.reply("음성방 들어가면 불러줄게");
	}
}