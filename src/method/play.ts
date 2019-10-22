import discordjs from "discord.js";
import discordapp from "../app";
import path from "path";
import fs from "fs";

import connect from "./connect";
import YoutubeDataAPI, { YoutubeDataAPIResponse } from "../lib/YoutubeDataAPI";
import { getMapper, getDispatcher, PlayStream, FileWriteStream } from "../lib/VoiceLib";
import { getURLParameter } from "../lib/StringLib";

// async queue stack type
type AsyncQueueType = {
	title: string;
	link: string;
	filePath: string;
};
const AsyncQueueStack: Array<AsyncQueueType> = [];
let flag = true;

/** 
 * youtube music download and play
 */
export default function play(this: discordapp, message: discordjs.Message, args: string[]) {
	// call message server id
	const serverId = message.guild.id;
	const mapper = getMapper.call(this, serverId);

	// mapper checking
	if (mapper) {
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
			message.channel.send("검색결과임 " + link);
			if (flag) {
				flag = false;
				const fileWriteStream = (title: string, link: string, filePath: string) => FileWriteStream(link, filePath).then((stream) => {
					const dispatcher = getDispatcher(mapper);
					if (dispatcher && !dispatcher.destroyed) {
						mapper.arrayQueueStack.push({	title,	filePath	});
					} else {
						mapper.currentAudioInfo = {	title,	filePath	};
						PlayStream(mapper, stream);
					}
				}).catch((err: Error) => {
					message.channel.send(`[ERROR]${err.message}`);
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

		// youtube link check
		if (/(youtu)\.?(be)?(\.com)?/g.test(args[0])) {
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
			// youtube title search
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
	} else {
		// reconnect
		new Promise<void>((resolve) => {
			connect.call(this, message, args, resolve);
		}).then(() => {
			play.call(this, message, args);
		});
	}
};
