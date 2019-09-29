"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
 * 도움말명령어입니다.
 */
function default_1(message, args) {
    fs_1.default.readFile(path_1.default.resolve(__dirname, "../template/guide/main"), {
        encoding: "utf8"
    }, function (err, data) {
        if (err)
            throw err;
        message.reply(data);
    });
}
exports.default = default_1;
