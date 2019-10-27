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
import loop from "./loop";
import remove from "./remove";

// command korean path
const method: {
	[key: string]: Function;
} = {
	"ㅍ": ping,
	"핑": ping,
	"ㄷㅇ": help,
	"도움": help,
	"ㅇㅈ": connect,
	"입장": connect,
	"ㅌㅈ": disconnect,
	"퇴장": disconnect,
	"ㄱ": play,
	"고": play,
	"ㅁㄹ": playlist,
	"목록": playlist,
	"ㅋㄹ": clean,
	"클린": clean,
	"ㅉ": pause,
	"정지": pause,
	"ㄷㅅ": resume,
	"다시": resume,
	"ㅅㅋ": skip,
	"스킵": skip,
	"ㄹㅍ": loop,
	"루프": loop,
	"ㅈㄱ": remove,
	"제거": remove
};

export default method;