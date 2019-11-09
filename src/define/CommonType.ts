export type PayloadData = {
	[key: string]: string | number | null | undefined;
};

/** audio infomation interface */
export type AudioInfo = {
	/** .mp3 file path */
	filePath: string;
	/** youtube title name */
	title: string;
};

// async queue stack type
export type AsyncQueueType = {
	title: string;
	link: string;
	filePath: string;
};

export type LocaleContentType = {
	[key: string]: any;
	commandBox: {
		[key: string]: string;
	};
};

export type LocaleType = "ko" | "en";