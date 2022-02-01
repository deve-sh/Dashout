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

interface RazorpayPaymentResponse {
	razorpay_payment_id: string;
	razorpay_order_id: string;
	razorpay_signature: string;
}

export const verifyRepayment = async (
	razorpayResponse: RazorpayPaymentResponse,
	callback: (error?: string) => any
) => {
	request({
		endpoint: "/api/settleUserBill",
		data: {
			razorpay_payment_id: razorpayResponse.razorpay_payment_id,
			razorpay_order_id: razorpayResponse.razorpay_order_id,
			razorpay_signature: razorpayResponse.razorpay_signature,
			status: "successful",
		},
		options: { headers: { authorization: await getToken() } },
		requestType: "post",
		callback,
	});
};
