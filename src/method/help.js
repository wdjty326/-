const fs = require("fs");
const path = require("path");
/**
 * 도움말명령어입니다.
 */
module.exports = function(message) {
	fs.readFile(
		path.resolve(__dirname, "../template/guide/main"),
		{
			encoding: "utf8"
		},
		(err, data) => {
			if (err) throw err;
			message.reply(data);
		}
	);
}