
const ytdl = require("ytdl-core");
const streamOptions = { seek: 0, volume: 1 };

module.exports = function(message, args) {
	if (this.connect) {
		const stream = ytdl(args[0], { filter : 'audioonly' });
		const broadcast = this.client.createVoiceBroadcast();
		broadcast.playStream(stream);
		const dispatcher = this.connect.playBroadcast(broadcast);
		dispatcher.setVolumeLogarithmic(100);
		console.log(dispatcher);
	} else {
		message.reply("방부터 들어가자");
	}
}