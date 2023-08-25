import axios from "axios";
import { localStorageAction } from "./localstorage";

axios.defaults.baseURL = "http://localhost:8000";

export const sendRequest = async ({
	method = "GET",
	route,
	body,
	includeHeaders = true,
}) => {
	if (!route) throw Error("URL required");

	const headers = includeHeaders
		? {
				Authorization: `Bearer ${localStorageAction("token")}`,
				"Content-Type": "application/json",
		  }
		: {};

	try {
		const response = await axios.request({
			method,
			url: route,
			data: body,
			headers,
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};
