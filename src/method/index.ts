import ping from "./ping";
import help from "./help";

import connect from "./connect";
import disconnect from "./disconnect";

import play from "./play";
import playlist from "./playlist";

import pause from "./pause";
import resume from "./resume";
import skip from "./skip";
import clean from "./clean";

import test from "./test";

// 명령어 한글 패치
const method: {
	[key: string]: Function;
} = {
	"ㅍ": ping,
	"ㄷㅇ": help,
	"ㅇㅈ": connect,
	"ㅌㅈ": disconnect,
	"ㄱ": play,
	"ㅁㄹ": playlist,
	"ㅋㄹ": clean,
	"ㅉ": pause,
	"ㄷㅅ": resume,
	"ㅅㅋ": skip,
	"ㅌㅇ": test
};

export default method;