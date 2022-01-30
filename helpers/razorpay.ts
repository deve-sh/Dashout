import razorpaySDK from "razorpay";

const razorpay = new razorpaySDK({
	key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
