import axios from "axios";

import { SerializeGet } from "../lib/Functions";

import { PayloadData } from "../define/Common";
import YoutubeAPIResponse from "../define/YoutubeAPI";

/**
 * 사용되는 유튜브 API 정보입니다.
 */
const YoutubeAPI = {
	/**
	 * videos api 를 호출합니다.
	 */
	video: (Payload: PayloadData) => new Promise<YoutubeAPIResponse>((resolve, reject) => {
		axios.get(`https://www.googleapis.com/youtube/v3/videos?${SerializeGet(Payload)}`).then((response) => {
			const { status, data } = response;
			if (status === 200)
				if (data.items) resolve(data as YoutubeAPIResponse);
				else reject(new Error("not found"));
			else reject(new Error(status.toString()));
		}).catch((err) => {
			if (typeof err === "string")
				reject(new Error(err));
			else
				reject(err);
		});
	}),
	/**
	 * search api를 호출합니다.
	 */
	search: (Payload: PayloadData) => new Promise<YoutubeAPIResponse>((resolve, reject) => {
		axios.get(`https://www.googleapis.com/youtube/v3/search?${SerializeGet(Payload)}`).then((response) => {
			const { status, data } = response;
			if (status === 200)
				if (data.items) resolve(data as YoutubeAPIResponse);
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

export default YoutubeAPI;