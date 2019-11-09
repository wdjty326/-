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

import template from "../locale/template";

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

	constructor(instance: DiscordApp) {
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

		this.commandBox = {
			[template.commandBox["ping_type1"]]: this.ping,
			[template.commandBox["ping_type2"]]: this.ping,

			[template.commandBox["help_type1"]]: this.help,
			[template.commandBox["help_type2"]]: this.help,

			[template.commandBox["connect_type1"]]: this.connect,
			[template.commandBox["connect_type2"]]: this.connect,

			[template.commandBox["disconnect_type1"]]: this.disconnect,
			[template.commandBox["disconnect_type2"]]: this.disconnect,

			[template.commandBox["play_type1"]]: this.play,
			[template.commandBox["play_type2"]]: this.play,

			[template.commandBox["playlist_type1"]]: this.playlist,
			[template.commandBox["playlist_type2"]]: this.playlist,

			[template.commandBox["clean_type1"]]: this.clean,
			[template.commandBox["clean_type2"]]: this.clean,

			[template.commandBox["pause_type1"]]: this.pause,
			[template.commandBox["pause_type2"]]: this.pause,

			[template.commandBox["resume_type1"]]: this.resume,
			[template.commandBox["resume_type2"]]: this.resume,

			[template.commandBox["skip_type1"]]: this.skip,
			[template.commandBox["skip_type2"]]: this.skip,

			[template.commandBox["loop_type1"]]: this.loop,
			[template.commandBox["loop_type2"]]: this.loop,

			[template.commandBox["remove_type1"]]: this.remove,
			[template.commandBox["remove_type2"]]: this.remove
		};
	}

	public call(command: string, message: Message, args?: string[]): void {
		if (this.commandBox[command]) this.commandBox[command](message, args);
		else	message.channel.send(template["helpguide"]);
	}
}
