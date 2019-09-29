"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ping을 가져옵니다.
 *
 * bind를 사용하여 DiscordApp 객체를 넘겨주어야합니다.
 */
function default_1(message, args) {
    message.reply("[DEBUG]\uC751\uB2F5\uC18D\uB3C4 : " + this.client.ping + "(ms)");
}
exports.default = default_1;
;
