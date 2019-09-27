
const ytdl = require("ytdl");

module.exports = function(message, args) {
	const broadcast = this.client.createVoiceBroadcast();
	if (this.connect) {
		const stream = ytdl(args[0], { filter : 'audioonly' });
		broadcast.playStream(stream);

		this.connect.playBroadcast(broadcast);
	} else {
		message.reply("방부터 들어가자");
	}
}