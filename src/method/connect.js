"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 봇이 음성방에서 퇴장합니다. */
function default_1(message, args) {
    var _this = this;
    var voiceChannel = message.member.voiceChannel;
    // 호출한상대가 채널방에 들어와있는지 체크합니다.
    if (voiceChannel) {
        // 이미 다른방에 들어와있는지 확인합니다.
        if (!this.connect) {
            voiceChannel
                .join()
                .then(function (connect) { return _this.connect = connect; })
                .catch(function (err) { return message.reply(err.toString()); });
        }
        else {
            message.reply("나 누가이미불러서 바쁨 ㅅㄱ");
        }
    }
    else {
        message.reply("님 어딨음? 음성방에 없는데??");
    }
}
exports.default = default_1;
;
