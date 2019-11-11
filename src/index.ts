import path from "path";
import fs from "fs";
import DiscordApp from "./app";

const client_token = fs.readFileSync(path.resolve(__dirname, "client_token"))
	.toString()
	.replace(/(\r|\n| )/g, "");

const api_key = fs.readFileSync(path.resolve(__dirname, "api_key"))
	.toString()
	.replace(/(\r|\n| )/g, "");

let debug_key;
try {
	debug_key = fs.readFileSync(path.resolve(__dirname, "debug_key"))
		.toString()
		.replace(/(\r|\n| )/g, "");
} catch (e) {
	console.log(e);
} finally {
	new DiscordApp(client_token, api_key, debug_key);
}