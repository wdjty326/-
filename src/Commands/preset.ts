import discordjs from "discord.js";
import discordapp from "../app";

import DB from "../DB/Database";
import DiscordVoiceInfomation from "../Defines/DiscordVoice";

import { AudioInfo } from "../Defines/Common";
import { PlayFile, getFileSize, PlayOptions } from "../Libs/Voices";

export default function(this: discordapp, message: discordjs.Message, args: string[]): void {
	const server_id = message.guild.id;

	if (this.validate(server_id)) {
		const user_id = message.member.id;
		const preset_name = args.slice(1).join("");
		const obj: DiscordVoiceInfomation = this.connection(server_id);

		switch(args[0]) {
			case this.template["save"]:
					const savelist: AudioInfo[] = [];
					if(obj.playingAudio) savelist.push(obj.playingAudio);
					obj.arrayQueueStack.forEach((data) => savelist.push(data));

					DB.getDatabase().insertPreset(server_id, user_id, preset_name, savelist)
					.then(() => {
						message.channel.send(this.template["savePreset"] + ":" + preset_name);
					})
					.catch((err) => {
						console.log(err);
						message.channel.send(err);
					});
				break;
			case this.template["load"]:
				DB.getDatabase().selectPreset(server_id, user_id, preset_name).then((data) => {
					obj.arrayQueueStack.length = 0;
					obj.arrayQueueStack = data;

					if (!obj.playingAudio) {
						obj.playingAudio = data.shift() as AudioInfo;

						const size = getFileSize(obj.playingAudio.filePath);
						PlayFile(obj, obj.playingAudio.filePath, PlayOptions(size));
					} else {
						const dispatcher = this.dispatcher(server_id);
						if (dispatcher) dispatcher.end();
					}

					message.channel.send(this.template["loadPreset"] + ":" + preset_name);
				})
				.catch((err) => {
					console.log(err);
					message.channel.send(err);
				});
				break;
			case this.template["remove"]:
				DB.getDatabase().deletePreset(server_id, user_id, preset_name).then(() => {
					message.channel.send(this.template["removePreset"] + ":" + preset_name);
				})
				.catch((err) => {
					console.log(err);
					message.channel.send(err);
				});
				break;
			case this.template["presetlist"]:
				DB.getDatabase().selectPresetList(server_id, user_id).then((rows) => {
					message.channel.send(this.template["listPreset"] + "\n" + rows.join("\n"));
				});
				break;
		}
	}
};
