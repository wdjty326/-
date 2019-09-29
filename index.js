"use strict";
// const path = require("path");
// const fs = require("fs");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var app_1 = __importDefault(require("./src/app"));
var data = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "client_token"));
if (data)
    new app_1.default(data.toString());
