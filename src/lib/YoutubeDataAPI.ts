import axios from "axios";

import { SerializeGet } from "../lib/StringLib";

import { PayloadData } from "../define/CommonType";
import YoutubeDataAPIResponse from "../define/YoutubeDataInterface";

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