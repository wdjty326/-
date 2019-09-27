const ping = require("./method/ping");
const help = require("./method/help");
const connect = require("./method/connect");
const disconnect = require("./method/disconnect");
const play = require("./method/play");


module.exports = {
	ping,
	help,
	connect,
	disconnect,
	play,
};