import ping from "./method/ping";
import help from "./method/help";
import connect from "./method/connect";
import disconnect from "./method/disconnect";
import play from "./method/play";

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