import ping from "./ping";
import help from "./help";
import connect from "./connect";
import disconnect from "./disconnect";
import play from "./play";
import pause from "./pause";
import resume from "./resume";
import skip from "./skip";

const method: {
	[key: string]: Function;
} = {
	ping,
	help,
	connect,
	disconnect,
	play,
	pause,
	resume,
	skip
};

export default method;