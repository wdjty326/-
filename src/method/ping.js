/**
 * ping을 가져옵니다.
 * 
 * bind를 사용하여 DiscordApp 객체를 넘겨주어야합니다.
 */
module.exports = function(message) {
	message.reply(`[DEBUG]응답속도 : ${this.client.ping}(ms)`);
};
