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
import preset from "./preset";

import debuging from "./Debuging";

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
	private preset: Function;

	private debug: Function;

	constructor(instance: DiscordApp) {
		this.call = this.call.bind(this);

		this.preset = preset.bind(instance);
		this.debug = debuging.bind(instance);
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
			[template.commandBox["debug_type"]]: this.debug,

			[template.commandBox["preset_type"]]: this.preset,

			[template.commandBox["ping_type"]]: this.ping,

			[template.commandBox["help_type"]]: this.help,

			[template.commandBox["connect_type"]]: this.connect,

			[template.commandBox["disconnect_type"]]: this.disconnect,

			[template.commandBox["play_type"]]: this.play,

			[template.commandBox["playlist_type"]]: this.playlist,

			[template.commandBox["clean_type"]]: this.clean,

			[template.commandBox["pause_type"]]: this.pause,

			[template.commandBox["resume_type"]]: this.resume,

			[template.commandBox["skip_type"]]: this.skip,

			[template.commandBox["loop_type"]]: this.loop,

			[template.commandBox["remove_type"]]: this.remove
		};
	}

	public call(command: string, message: Message, args?: string[]): void {
		if (this.commandBox[command]) this.commandBox[command](message, args);
		else	message.channel.send(template["helpguide"]);
	}
}
