/**
 * 입력값이 자연수인지 여부를 확인합니다.
 * @param n 
 */
export const isNaN = (n: number): boolean => !globalThis.isNaN(n) && n > 0;

/**
 * URL에 있는 파라미터를 가져옵니다.
 * @param url 
 */
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

/**
 * object 객체를 QueryString 으로 변환합니다.
 * @param obj 
 */
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