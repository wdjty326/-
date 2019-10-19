import discordjs from "discord.js";
import discordapp from "../app";
import { MainGuideContent } from "../template";

import fs from "fs";
import path from "path";

/**
 * 도움말명령어입니다.
 */
export default function(this: discordapp, message: discordjs.Message, args?: string[]) {
	message.reply(MainGuideContent);
}