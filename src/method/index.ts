import { Message } from "discord.js";

import ping from "./ping";
import help from "./help";

import connect from "./connect";
import disconnect from "./disconnect";

import play from "./play";
import playlist from "./playlist";

import pause from "./pause";
import resume from "./resume";
import skip from "./skip";
import clean from "./clean";
import loop from "./loop";
import remove from "./remove";
import DiscordApp from "app";


export default class method {
	private commandBox: {	[key: string]: Function;	};

	constructor(instance: DiscordApp) {
		const m_ping = ping.bind(instance);
		const m_help = help.bind(instance);
		const m_connect = connect.bind(instance);
		const m_disconnect = disconnect.bind(instance);
		const m_play = play.bind(instance);
		const m_playlist = playlist.bind(instance);
		const m_clean = clean.bind(instance);
		const m_pause = pause.bind(instance);
		const m_resume = resume.bind(instance);
		const m_skip = skip.bind(instance);
		const m_loop = loop.bind(instance);
		const m_remove = remove.bind(instance);

		this.commandBox = {
			"ㅍ": m_ping,
			"핑": m_ping,

			"ㄷㅇ": m_help,
			"도움": m_help,

			"ㅇㅈ": m_connect,
			"입장": m_connect,

			"ㅌㅈ": m_disconnect,
			"퇴장": m_disconnect,

			"ㄱ": m_play,
			"고": m_play,

			"ㅁㄹ": m_playlist,
			"목록": m_playlist,

			"ㅋㄹ": m_clean,
			"클린": m_clean,

			"ㅉ": m_pause,
			"정지": m_pause,

			"ㄷㅅ": m_resume,
			"다시": m_resume,

			"ㅅㅋ": m_skip,
			"스킵": m_skip,

			"ㄹㅍ": m_loop,
			"루프": m_loop,

			"ㅈㄱ": m_remove,
			"제거": m_remove
		};
	}

	public call(command: string, message: Message, args?: string[]): void {
		if (this.commandBox[command]) this.commandBox[command](message, args);
		else	message.channel.send("=ㄷㅇ(or 도움) 으로 명령어 체크 바람");
	}
}
