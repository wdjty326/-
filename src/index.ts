import path from "path";
import fs from "fs";
import DiscordApp from "./app";


fs.readFile(path.resolve(__dirname, "..", "client_token"), (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data.toString(), "a");
		new DiscordApp(
			data.toString().replace(/(\r|\n| )/g, "")
		);	
	}
});