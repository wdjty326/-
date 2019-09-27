/** 봇이 음성방에서 퇴장합니다. */
module.exports = function() {
	if (this.connect) {
		this.connect.disconnect();
		this.connect = null;
	}
};