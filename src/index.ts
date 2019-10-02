// const path = require("path");
// const fs = require("fs");

import path from "path";
import fs from "fs";
import DiscordApp from "./app";

const data = fs.readFileSync(path.resolve(__dirname, "..", "client_token"));
if (data)
	new DiscordApp(data.toString());