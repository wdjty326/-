const path = require("path");
const fs = require("fs");
// const DiscordApp = require("./app");

const ClientTokenPath = path.resolve(__dirname, "client_token");
const ClientTokenOption = {
	encoding: "utf8"
};
const ClientTokenPromise = (err, data) => new Promise((resolve, reject) => {
	if (err) reject(err);
	else resolve(data);
}).then((data) => {
	console.log(data);
	// new DiscordApp(data);
}).catch((err) => {
	console.log(err);
});

fs.readFile(ClientTokenPath, ClientTokenOption, ClientTokenPromise);