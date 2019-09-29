"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ping_1 = __importDefault(require("./method/ping"));
var help_1 = __importDefault(require("./method/help"));
var connect_1 = __importDefault(require("./method/connect"));
var disconnect_1 = __importDefault(require("./method/disconnect"));
var play_1 = __importDefault(require("./method/play"));
var method = {
    ping: ping_1.default,
    help: help_1.default,
    connect: connect_1.default,
    disconnect: disconnect_1.default,
    play: play_1.default,
};
exports.default = method;
