const fs = require("fs"),
	path = require("path"),
	glob = require("glob");

if (!fs.existsSync("./dist/template")) fs.mkdirSync("./dist/template");

glob.sync("./src/template/**/*").forEach(x => {
	const dist = x.replace(/src/g, "dist");
	const lstat = fs.lstatSync(x);
	if (lstat.isDirectory()) {
		if (!fs.existsSync(dist))
			fs.mkdirSync(dist);
	} else {
		if (!fs.existsSync(dist))
			fs.copyFileSync(
				x,
				dist
			);
	}
});
