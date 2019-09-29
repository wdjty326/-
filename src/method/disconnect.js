"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 봇이 음성방에서 퇴장합니다. */
function default_1(message, args) {
    if (this.connect) {
        this.connect.disconnect();
        this.connect = null;
        message.reply("바위");
    }
}
exports.default = default_1;
;
