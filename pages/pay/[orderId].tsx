import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";

import { MdAccountCircle as LoginIcon } from "react-icons/md";

import Button from "../../components/Button";
import ContentWrapper from "../../components/Layout/ContentWrapper";

import useUser from "../../hooks/useUser";

import { getToken } from "../../firebase/authentication";
import request from "../../helpers/request";
import toasts from "../../helpers/toasts";

const PayForOrder = ({ openLoginModal, orderId, clientId }) => {
	const user = useUser();
	const isLoggedIn = !!user;

	const [orderDetails, setOrderDetails] = useState(null);
	const [merchantDetails, setMerchantDetails] = useState(null);

	useEffect(() => {
		if (!orderId || !clientId)
			window.location.replace(document.referrer || "about:blank");
		if (!user?.uid) {
			// Show the user the login modal.
			openLoginModal();
		}
	}, []);

	const getOrderInfo = async () => {
		request({
			endpoint: "/api/getOrderDetails",
			requestType: "post",
			options: { headers: { authorization: await getToken() } },
			data: { orderId },
			callback: (error, response) => {
				if (error) {
					toasts.error(error);
					return Router.push("/");
				}
				setOrderDetails(response.order);
				setMerchantDetails(response.merchant);
			},
		});
	};

	useEffect(() => {
		if (isLoggedIn) {
			// Make a call for getting order and merchant details here.
			getOrderInfo();
		}
	}, [isLoggedIn]);

	return (
		<ContentWrapper centerContent>
			<Head>Dashout - Purchase Permission</Head>
			{user?.uid ? (
				<>{/* Consent Screen for user to go here. */}</>
			) : (
				<>
					<br />
					Please Login To Proceed
					<br />
					<br />
					<Button
						colorScheme="blue"
						variant="outline"
						leftIcon={<LoginIcon size="1.375rem" />}
						onClick={openLoginModal}
						$variant="hollow"
						$noMinWidth
						$paddingMultiplier="1.25"
					>
						Login
					</Button>
				</>
			)}
		</ContentWrapper>
	);
};

PayForOrder.getInitialProps = async (context) => {
	// Add getInitialProps so this page is not statically optimized by Next.js
	const { query } = context;
	return query;
};

export default PayForOrder;
