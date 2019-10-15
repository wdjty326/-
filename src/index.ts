import path from "path";
import fs from "fs";
import DiscordApp from "./app";

const client_token = fs.readFileSync(path.resolve(__dirname, "..", "client_token"))
	.toString()
	.replace(/(\r|\n| )/g, "");
console.log("[DEBUG]client_token:",client_token);

const api_key = fs.readFileSync(path.resolve(__dirname, "..", "api_key"))
	.toString()
	.replace(/(\r|\n| )/g, "");
console.log("[DEBUG]api_key:",api_key);


new DiscordApp(client_token, api_key);
