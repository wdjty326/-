import path from "path";
import fs from "fs";

export default class AudioOption {
	private constructor() {
		if (!fs.existsSync(this.MusicDir))	fs.mkdirSync(this.MusicDir);

		this.AudioBitrate = 96;
		this.AudioFrequency = 48000;
		this.AudioCodec = "libopus";
	}
	private static instance: AudioOption = new AudioOption();

	private MusicDir: string = path.resolve(__dirname, "music");

	private PassesByte: number = 16000;

	private AudioCodec: "libopus";
	private AudioBitrate: 32 | 48 | 64 | 96;
	private AudioFrequency: 24000 | 48000;

	public static getInstance() {
		return AudioOption.instance;
	}

	public getPassesByte() {
		return this.PassesByte;
	}

	public getAudioCodec() {
		return this.AudioCodec;
	}

	public getAudioBitrate() {
		return this.AudioBitrate;
	}

	public getAudioFrequency() {
		return this.AudioFrequency;
	}

	public getMusicDir() {
		return this.MusicDir;
	}

	public setPassesByte(PassesByte: number) {
		this.PassesByte = PassesByte;
	}

	public setAudioCodec(AudioCodec: "libopus") {
		this.AudioCodec = AudioCodec;
	}

	public setAudioBitrate(AudioBitrate: 32 | 48 | 64 | 96) {
		this.AudioBitrate = AudioBitrate;
	}

	public setAudioFrequency(AudioFrequency: 24000 | 48000) {
		this.AudioFrequency = AudioFrequency;
	}
}