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
import DiscordApp from "../app";
import { LocaleContentType } from "define/CommonType";

export default class command {
	private commandBox: {	[key: string]: Function;	} = {};

	private ping: Function;
	private help: Function;
	private connect: Function;
	private disconnect: Function;
	private play: Function;
	private playlist: Function;
	private clean: Function;
	private pause: Function;
	private resume: Function;
	private skip: Function;
	private loop: Function;
	private remove: Function;
	
	private locale: LocaleContentType = {
		commandBox: {}
	};

	setLocaleContent(instance: DiscordApp) {
		this.locale = instance.getLocaleContent();
		this.commandBox = {
			[this.locale.commandBox["ping_type1"]]: this.ping,
			[this.locale.commandBox["ping_type2"]]: this.ping,

			[this.locale.commandBox["help_type1"]]: this.help,
			[this.locale.commandBox["help_type2"]]: this.help,

			[this.locale.commandBox["connect_type1"]]: this.connect,
			[this.locale.commandBox["connect_type2"]]: this.connect,

			[this.locale.commandBox["disconnect_type1"]]: this.disconnect,
			[this.locale.commandBox["disconnect_type2"]]: this.disconnect,

			[this.locale.commandBox["play_type1"]]: this.play,
			[this.locale.commandBox["play_type2"]]: this.play,

			[this.locale.commandBox["playlist_type1"]]: this.playlist,
			[this.locale.commandBox["playlist_type2"]]: this.playlist,

			[this.locale.commandBox["clean_type1"]]: this.clean,
			[this.locale.commandBox["clean_type2"]]: this.clean,

			[this.locale.commandBox["pause_type1"]]: this.pause,
			[this.locale.commandBox["pause_type2"]]: this.pause,

			[this.locale.commandBox["resume_type1"]]: this.resume,
			[this.locale.commandBox["resume_type2"]]: this.resume,

			[this.locale.commandBox["skip_type1"]]: this.skip,
			[this.locale.commandBox["skip_type2"]]: this.skip,

			[this.locale.commandBox["loop_type1"]]: this.loop,
			[this.locale.commandBox["loop_type2"]]: this.loop,

			[this.locale.commandBox["remove_type1"]]: this.remove,
			[this.locale.commandBox["remove_type2"]]: this.remove
		};
	}

	constructor(instance: DiscordApp) {
		this.setLocaleContent = this.setLocaleContent.bind(this);
		this.call = this.call.bind(this);

		this.ping = ping.bind(instance);
		this.help = help.bind(instance);
		this.connect = connect.bind(instance);
		this.disconnect = disconnect.bind(instance);
		this.play = play.bind(instance);
		this.playlist = playlist.bind(instance);
		this.clean = clean.bind(instance);
		this.pause = pause.bind(instance);
		this.resume = resume.bind(instance);
		this.skip = skip.bind(instance);
		this.loop = loop.bind(instance);
		this.remove = remove.bind(instance);

		this.setLocaleContent(instance);
	}

	public call(command: string, message: Message, args?: string[]): void {
		if (this.commandBox[command]) this.commandBox[command](message, args);
		else	message.channel.send(this.locale["helpguide"]);
	}
}
