import discordjs, { StreamDispatcher } from "discord.js";

import command from "./command";
import template from "./locale/template";

import DiscordVoiceInfomation from "define/DiscordVoiceInterface";

/** discord main class. */
export default class DiscordApp {
	/** connect discord client. */
	protected client: discordjs.Client = new discordjs.Client();

	/** voice room connection mapper */
	protected connectionMapper: Map<string, DiscordVoiceInfomation> = new Map();

	/** google api key */
	protected apikey: string = "";

	/** command object */
	protected command: command;

	protected test?: string;

	/** command line startwith */
	private readonly commandLine = "=";
	protected template = template;

	constructor(token: string, apikey: string, test?: string) {	
		this.ready = this.ready.bind(this);
		this.message = this.message.bind(this);

		this.connection = this.connection.bind(this);
		this.dispatcher = this.dispatcher.bind(this);
		this.validate = this.validate.bind(this);
		this.delete = this.delete.bind(this);

		this.apikey = apikey;
		this.test = test;
		this.command = new command(this);
		
		this.client.on("ready", this.ready);
		this.client.on("message", this.message);
	
		this.client.login(token);
	}

	/** login 이후 대기중일때 정보입니다. */
	ready() {
		console.log("[READY]Start Server");
	}

	/** 메세지를 전달 받았을때 정보입니다. */
	message(message: discordjs.Message) {
		/** 텍스트 내용 */
		const { content } = message;
		if (
			content.startsWith(this.commandLine)
			&& this.client.user.id != message.member.id
		) {
			/** 시작명령어 */
			const params = content
				.substr(this.commandLine.length)
				.split(" ");

			const exec = params[0].toLowerCase();
			const args = params.splice(1);

			this.command.call(exec, message, args);
		}
	}

	/** */
	validate(id: string): boolean {
		return this.connectionMapper.has(id);
	}

	/** */
	connection(id: string): DiscordVoiceInfomation {
		return this.connectionMapper.get(id) as DiscordVoiceInfomation;
	}

	/** */
	delete(id: string): void {
		this.connectionMapper.delete(id);
	}

	/** */
	dispatcher(id: string): StreamDispatcher {
		return this.connection(id).connection.dispatcher;
	}
}