import { getToken } from "../firebase/authentication";
import request from "../helpers/request";

export const createRepaymentTransaction = async (
	callback: (errorMessage: string | null, orderInfo?: any) => any
) => {
	try {
		request({
			endpoint: "/api/createBillSettlementTransaction",
			options: { headers: { authorization: await getToken() } },
			requestType: "post",
			callback: (error, response) => {
				if (error) return callback(error);
				return callback(null, response);
			},
		});
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};
