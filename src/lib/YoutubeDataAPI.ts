import axios from "axios";

import { SerializeGet } from "../lib/StringLib";

export interface YoutubeDataAPIResponse {
	kind: string;
	etag: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: Array<{
		kind: string;
		etag: string;
		id: {
			kind: string;
			videoId: string;
		};
		snippet: {
			publishedAt: string;
			channelId: string;
			title: string;
			description: string;
			thumbnails: {
				[key: string]: {
					url: string;
					width: number;
					height: string;
				};
			};
			channelTitle: string;
			tag: string[],
			categoryId: string;
			liveBroadcastContent: string;
			localized: {
				title: string;
				description: string;
			};
		}
	}>;
}

type PayloadData = {
	[key: string]: string | number | null | undefined;
};

const YoutubeDataAPI = {
	Video: (Payload: PayloadData) => new Promise<YoutubeDataAPIResponse>((resolve, reject) => {
		axios.get(`https://www.googleapis.com/youtube/v3/videos?${SerializeGet(Payload)}`).then((response) => {
			const { status, data } = response;
			if (status === 200)
				if (data.items) resolve(data as YoutubeDataAPIResponse);
				else reject(new Error("not found"));
			else reject(new Error(status.toString()));
		}).catch((err) => {
			if (typeof err === "string")
				reject(new Error(err));
			else
				reject(err);
		});
	}),
	Search: (Payload: PayloadData) => new Promise<YoutubeDataAPIResponse>((resolve, reject) => {
		axios.get(`https://www.googleapis.com/youtube/v3/search?${SerializeGet(Payload)}`).then((response) => {
			const { status, data } = response;
			if (status === 200)
				if (data.items) resolve(data as YoutubeDataAPIResponse);
				else reject(new Error("not found"));
			else reject(new Error(status.toString()));
		}).catch((err) => {
			if (typeof err === "string")
				reject(new Error(err));
			else
				reject(err);
		});
	})
};

export default YoutubeDataAPI;