export default interface YoutubeDataAPIResponse {
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
