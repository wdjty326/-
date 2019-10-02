import ping from "./ping";
import help from "./help";
import connect from "./connect";
import disconnect from "./disconnect";
import play from "./play";

const method: {
	[key: string]: Function;
} = {
	ping,
	help,
	connect,
	disconnect,
	play,
};

export default method;