const fs = require("fs"),
	glob = require("glob");

if (!fs.existsSync("./dist/template")) fs.mkdirSync("./dist/template");
if (!fs.existsSync("./dist/dev")) fs.mkdirSync("./dist/dev");


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

glob.sync("./dev/**/*").forEach(x => {
	const dist = "./dist" + x.substr(1);
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
