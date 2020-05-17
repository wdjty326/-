const fs = require("fs");


/** copy key file */
const copyFilePath = [
	{ src: "src/debug_key", dst: "dist/debug_key" },
	{ src: "src/api_key", dst: "dist/api_key" },
	{ src: "src/client_token", dst: "dist/client_token" },
];
copyFilePath.forEach((obj) => fs.copyFileSync(obj.src, obj.dst));