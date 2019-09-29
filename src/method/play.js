"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var streamOptions = { seek: 0, volume: 1 };
function default_1(message, args) {
    if (this.connect) {
        if (args[0]) {
            console.log(args[0]);
            var stream = ytdl_core_1.default(args[0], { filter: 'audioonly' });
            this.connect.playStream(stream, streamOptions);
            console.log("노래틈", this.connect.channel.id, this.connect.status);
        }
        else {
            message.reply("뭔노래틀게?");
        }
    }
    else {
        message.reply("방부터 들어가자");
    }
}
exports.default = default_1;
