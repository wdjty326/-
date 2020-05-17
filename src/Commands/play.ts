import discordjs from "discord.js";
import discordapp from "../app";
import path from "path";
import fs from "fs";

import connect from "./connect";
import YoutubeAPI from "../Libs/YoutubeAPI";
import {
	PlayStream,
	FileWriteStream,
	getFileSize,
	PlayOptions
} from "../Libs/Voices";
import { getURLParameter } from "../Libs/Functions";

import { AsyncQueueType } from "../Defines/Common";
import YoutubeAPIResponse from "../Defines/YoutubeAPI";
import AudioOption from "../option";

const AsyncQueueStack: Array<AsyncQueueType> = [];
let flag = true;

/** 
 * youtube music download and play
 */
export default function play(this: discordapp, message: discordjs.Message, args: string[]) {
	// call message server id
	const id = message.guild.id;

	// mapper checking
	if (this.validate(id)) {
		const obj = this.connection(id);
		let link: string = "";
		let v: string = "";

		// callback
		const callback = (data: YoutubeAPIResponse) => {
			const title = data.items[0].snippet.title;
			const dirPath = path.resolve(AudioOption.getInstance().getMusicDir(), id);		
			if (!fs.existsSync(dirPath))	fs.mkdirSync(dirPath);

			const filePath = path.resolve(dirPath, `${v}.opus`);
			if (flag) {
				flag = false;
				const dispatcher = this.dispatcher(id);
				const fileWriteStream = (title: string, link: string, filePath: string) => FileWriteStream(link, filePath).then((stream) => {
					console.log(id + "," + title + "," + getFileSize(filePath));
					if (!obj.playingAudio) {
						obj.playingAudio = {	title,	filePath	};

						const size = getFileSize(filePath);
						PlayStream(obj, stream, PlayOptions(size));
					} else {
						obj.arrayQueueStack.push({	title,	filePath	});										
					}
				}).catch((err: Error) => {
					message.channel.send(`[ERROR]${err.message}`);
					if(dispatcher) dispatcher.end();
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

			YoutubeAPI.video({
				key: this.apikey,
				part: "id, snippet",
				id: parameters["v"]
			}).then((data) => {
				callback(data);
			});
		} else {
			// youtube title search
			YoutubeAPI.search({
				key: this.apikey,
				part: "id, snippet",
				q: encodeURI(args.join(" ")),
				maxResults: 1
			}).then((data) => {
				v = data.items[0].id.videoId;
				link = `https://youtube.com/watch?v=${v}`;
				message.channel.send(this.template["search"] + ":" + link);
				callback(data);
			});
		}
	} else {
		// reconnect
		new Promise<void>((resolve) => {
			connect.call(this, message, resolve);
		}).then(() => {
			play.call(this, message, args);
		});
	}
};
