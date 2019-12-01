import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { AudioInfo } from "../define/CommonType";

class database {
	private static database = new database();
	private connect: sqlite3.Database;

	private constructor() {
		const dbfile = path.resolve(__dirname, "data.db");
		if (!fs.existsSync(dbfile)) fs.openSync(dbfile, "w");

		this.connect = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE);
		// 초기화
		this.Initial();
	}


	public insertPreset(server_id: string, user_id: string, preset_name: string, links: AudioInfo[]) {
		return new Promise((resolve, reject) => {
			this.connect.run("insert into tbl_music_preset(server_id, user_id, preset_name, links) values($server_id, $user_id, $preset_name, $links)", {
				$server_id: server_id,
				$user_id: user_id,
				$preset_name: preset_name,
				$links: JSON.stringify(links)
			}, (err) => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	public selectPreset(server_id: string, user_id: string, preset_name: string) {
		return new Promise<AudioInfo[]>((resolve, reject) => {
			this.connect.get("select links from tbl_music_preset where server_id = $server_id and user_id = $user_id and preset_name = $preset_name", {
				$server_id: server_id,
				$user_id: user_id,
				$preset_name: preset_name,
			}, (err, row) => {
				if (err) reject(err);

				try {
					resolve(JSON.parse(row.links));
				} catch(e) {
					reject(e);
				}
			});
		});
	}

	public deletePreset(server_id: string, user_id: string, preset_name: string) {
		return new Promise((resolve, reject) => {
			this.connect.run("delete from tbl_music_preset where server_id = $server_id and user_id = $user_id and preset_name = $preset_name", {
				$server_id: server_id,
				$user_id: user_id,
				$preset_name: preset_name,
			}, (err) => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	public static getDatabase() {
		return this.database;
	}

	private Initial() {
		this.connect.run(`create table tbl_music_preset(
			server_id text,
			user_id text,
			preset_name text not null,
			links text,
			primary key (server_id, user_id, preset_name)
		)`, (err) => console.log(err));
	}
}

export default database;
