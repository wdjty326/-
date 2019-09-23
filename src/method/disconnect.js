/** 봇이 채팅방에 입장합니다. */
module.exports = function(message) {
	const { voiceChannel } = message.member;
	// message.mentions.users.first();
	if (voiceChannel) {
		voiceChannel.join().then((connect) => console.log(connect));
	}
};