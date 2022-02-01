/* Dedicated Page to make repayments for users. */
import { useRouter } from "next/router";
import { useState } from "react";
import Script from "next/script";
import styled from "@emotion/styled";
import { Container, Text, Image } from "@chakra-ui/react";

import db from "../../firebase/firestore";
import { getToken } from "../../firebase/authentication";

import useStore from "../../store/useStore";

import setupProtectedRoute from "../../helpers/setupProtectedRoute";
import toasts from "../../helpers/toasts";
import request from "../../helpers/request";

const WalletImage = styled(Image)`
	max-width: 45vw;
`;

const MakeWalletPayment = ({ error, orderInfo, transactionInfo }) => {
	const router = useRouter();

	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);

	const [errorMessage, setErrorMessage] = useState(error);
	const [transactionState, setTransactionState] = useState("not-started");

	function initializePayment() {
		if (
			orderInfo?.status !== "created" ||
			transactionInfo?.status === "paid" ||
			transactionInfo?.status === "failed"
		)
			return setErrorMessage(
				"Payment process has already taken place. Please check back in some time."
			);
		if (user.uid !== orderInfo.user) return setErrorMessage("Unauthorized");

		const options = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			amount: orderInfo.amount,
			currency: orderInfo.currency,
			name: "Dashout",
			description: "Dashout Repayment Transaction",
			image: "/logo-512.png",
			order_id: orderInfo.id,
			handler: async (response) => {
				request({
					endpoint: "/api/settleUserBill",
					data: {
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_order_id: response.razorpay_order_id,
						razorpay_signature: response.razorpay_signature,
						status: "successful",
					},
					options: { headers: { authorization: await getToken() } },
					requestType: "post",
					callback: (error) => {
						if (error) {
							setTransactionState("failed");
							return toasts.error(error);
						}
						setUser({
							...user,
							nSuccessfulTransactions: (user.nSuccessFulTransactions || 0) + 1,
						});
						setTransactionState("successful");
						toasts.success("Repayment Successful");
						router.push("/user/tab");
					},
				});
			},
			prefill: {
				name: user?.displayName || "",
				email: user?.email || "",
				contact: user?.phoneNumber || "",
			},
			notes: {},
			theme: {
				color: "#008080",
			},
		};
		const razorpayPaymentInstance = new globalThis.Razorpay(options);
		razorpayPaymentInstance.open();
		setTransactionState("started");
	}

	return (
		<Container maxW="container.xl" centerContent padding="2rem">
			<WalletImage src="/wallet.svg" objectFit="cover" alt="Wallet" />
			<br />
			<Text fontSize="lg" colorScheme="gray">
				{transactionState === "not-started"
					? "Transaction starting"
					: transactionState === "started"
					? "Transaction In Progress"
					: transactionState === "successful"
					? "Transaction Successful. Your Balance will reflect in your wallet soon."
					: "Transaction Failed"}
			</Text>
			<Script
				src="https://checkout.razorpay.com/v1/checkout.js"
				onLoad={initializePayment}
			/>
		</Container>
	);
};

MakeWalletPayment.getInitialProps = setupProtectedRoute(async (context) => {
	try {
		const { query } = context;

		if (!query.orderId) return { error: "Invalid Payment Session" };

		// Fetch order info from firestore.
		const orderInfo = (
			await db.collection("userbillsettlements").doc(query.orderId).get()
		).data();

		if (!orderInfo) return { error: "Payment Information Not Found" };

		return { orderInfo, user: orderInfo.user };
	} catch (err) {
		console.log(err);
		return { error: err.message };
	}
});

export default MakeWalletPayment;
