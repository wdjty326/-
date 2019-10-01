"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function default_1(message, args) {
    if (this.connect) {
        // const stream = ytdl(args[0], { filter : 'audioonly' });
        var stream = fs_1.default.createReadStream(path_1.default.resolve(__dirname, "music", "Labyrinth.mp3"));
        // const stream = ytdl(args[0], { filter : 'audioonly' });
        this.connect.playStream(stream);
        if (args[0]) {
            // stream.on("end", function(this: discordapp) {
            // 	this.connect.playStream(stream, streamOptions);
            // }.bind(this));
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
