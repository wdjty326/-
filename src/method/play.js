"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ytdl_core_1 = __importDefault(require("ytdl-core"));
function default_1(message, args) {
    if (this.connect) {
        var stream = ytdl_core_1.default(args[0], { filter: 'audioonly' });
        var broadcast = this.client.createVoiceBroadcast();
        broadcast.playStream(stream);
        var dispatcher = this.connect.playBroadcast(broadcast);
        dispatcher.setVolumeLogarithmic(100);
    }
    else {
        message.reply("방부터 들어가자");
    }
}
exports.default = default_1;
