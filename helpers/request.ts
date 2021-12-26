import axios from "axios";

interface RequestParams {
	endpoint: string;
	data?: any;
	options?: any;
	requestType?: "get" | "post" | "patch" | "delete" | "put";
	callback?: (error?: any, response?: any) => any;
	tries?: number;
	prevError?: any;
}

const request = async ({
	endpoint,
	data,
	options,
	requestType,
	callback,
	// For retry scenarios
	tries = 3,
	prevError = null,
}: RequestParams) => {
	try {
		if (!tries) throw new Error(prevError);
		const response = await axios[requestType](endpoint, data, options);
		if (callback && typeof callback === "function")
			return callback(null, response.data);
		else return response.data;
	} catch (err) {
		console.log(err);

		// Request failed, check if retry has been enabled and if tries are left.
		const triesLeft = tries - 1;
		if (
			((!err?.request && !err?.response) || // Couldn't make a request in the first place.
				(err?.request && !err?.response) || // Made request. Didn't get any response, i.e: something like CORS
				(err?.response?.status && Number(err?.response?.status) >= 500)) && // All other errors mean the user is doing something wrong, hence no retries
			Number(triesLeft) > 0
		) {
			console.log(`Retrying ${endpoint}, tries left: `, triesLeft);
			return request({
				endpoint,
				data,
				options,
				requestType,
				callback,
				tries: triesLeft,
				prevError: err,
			});
		} else {
			if (callback && typeof callback === "function") {
				return callback(
					err?.response?.data?.error ||
						err?.message ||
						"Something went wrong. Please try again later.",
					null
				);
			} else return null;
		}
	}
};

export default request;
