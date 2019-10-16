/** URL 에 있는 파라미터를 가져옵니다. */
export const getURLParameter = (url: string) => {
	const parameters: {
		[key: string]: string
	} = {};
	if (url.indexOf("?") > 0) {
		const parameterStrings = url.substr(url.indexOf("?") + 1);
		parameterStrings.split("&").forEach((parameterString) => {
			const parameter = parameterString.split("=");
			const key = parameter[0];
			const value = parameter[1];

			parameters[key] = value;
		});
	}

	return parameters;
}

export const SerializeGet = (obj: { [key: string]: string | number | boolean | undefined | null }): string  => Object.keys(obj)
	.filter((key) => obj[key] !== undefined)
	.map((key) => {
		const value = obj[key];
		if (value === null)
			return `${key}=`;
		else if (typeof value === "number")
			return `${key}=${value.toString()}`;
		else if (typeof value === "boolean")
			return `${key}=${value ? "true" : "false"}`;
		else // string or ...
			return `${key}=${value}`;
	}).join("&");