"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var base_1 = __importDefault(require("./base"));
var const_1 = require("./define/const");
/** discord 메인 클래스입니다. */
var DiscordApp = /** @class */ (function () {
    function DiscordApp(token) {
        /** 연결할 디스코드 클라이언트 입니다. */
        this.client = new discord_js_1.default.Client();
        this.connect = null;
        this.ready = this.ready.bind(this);
        this.message = this.message.bind(this);
        if (this.client) {
            this.client.on("ready", this.ready);
            this.client.on("message", this.message);
            this.client.login(token)
                .catch(function (reason) {
                console.log(reason);
            });
        }
    }
    /** login 이후 대기중일때 정보입니다. */
    DiscordApp.prototype.ready = function () {
        console.log("[DEBUG]READY");
    };
    /** 메세지를 전달 받았을때 정보입니다. */
    DiscordApp.prototype.message = function (message) {
        /** 텍스트 내용 */
        var content = message.content;
        if (content.startsWith(const_1.COMMAND_LINE)) {
            /** 시작명령어 */
            var params = content
                .toLowerCase()
                .substr(const_1.COMMAND_LINE.length)
                .split(" ");
            var exec = params[0];
            var args = params.splice(1);
            if (exec in base_1.default) {
                base_1.default[exec].call(this, message, args);
            }
            else
                message.reply("[DEBUG]불러오지못한명령어");
        }
    };
    return DiscordApp;
}());
exports.default = DiscordApp;
