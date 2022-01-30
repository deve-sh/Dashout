import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";

import { Avatar, HStack, Text } from "@chakra-ui/react";
import {
	MdAccountCircle as LoginIcon,
	MdCancel as CancelIcon,
	MdCheck as ConfirmIcon,
} from "react-icons/md";

import Button from "../../components/Button";
import ContentWrapper from "../../components/Layout/ContentWrapper";

import useUser from "../../hooks/useUser";

import auth from "../../firebase/authentication";
import request from "../../helpers/request";
import toasts from "../../helpers/toasts";

const PayForOrder = ({ openLoginModal, orderId }) => {
	const user = useUser();
	const isLoggedIn = !!user;

	const [orderDetails, setOrderDetails] = useState(null);
	const [merchantDetails, setMerchantDetails] = useState(null);

	useEffect(() => {
		if (!orderId) window.location.replace(document.referrer || "about:blank");
		if (!user?.uid) {
			// Show the user the login modal.
			openLoginModal();
		}
	}, []);

	const getOrderInfo = async () => {
		request({
			endpoint: "/api/getOrderDetails",
			requestType: "post",
			options: {
				headers: { authorization: await auth.currentUser.getIdToken() },
			},
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
		if (isLoggedIn && auth.currentUser) {
			// Make a call for getting order and merchant details here.
			getOrderInfo();
		}
	}, [isLoggedIn, auth.currentUser]);

	const confirmOrder = async () => {
		request({
			endpoint: "/api/confirmOrder",
			requestType: "post",
			options: {
				headers: { authorization: await auth.currentUser.getIdToken() },
			},
			data: { orderId },
			callback: (error) => {
				if (error) {
					toasts.error(error);
					setTimeout(() =>
						window.location.replace(
							`${merchantDetails.errorRedirect}?orderId=${orderId}`
						)
					);
				}
				toasts.success("Transaction was successfully completed.");
				setTimeout(() =>
					window.location.replace(
						`${merchantDetails.successRedirect}?orderId=${orderId}&status=confirmed`
					)
				);
			},
		});
	};

	const declineOrder = async () => {
		request({
			endpoint: "/api/declineOrder",
			requestType: "post",
			options: {
				headers: { authorization: await auth.currentUser.getIdToken() },
			},
			data: { orderId },
			callback: (error) => {
				if (error) toasts.error(error);
				else toasts.success("Transaction was successfully declined.");
				setTimeout(() =>
					window.location.replace(
						`${merchantDetails.errorRedirect}?orderId=${orderId}&status=declined`
					)
				);
			},
		});
	};

	return (
		<ContentWrapper centerContent>
			<Head>
				<title>Dashout - {orderDetails?.name || "Purchase Permission"}</title>
			</Head>
			{user?.uid ? (
				<>
					<Avatar
						size="2xl"
						name={merchantDetails?.merchantName || "Merchant"}
						src={merchantDetails?.photoURL}
						bg="white"
						border="0.01rem solid var(--bordergrey)"
					/>
					<Text fontSize="3xl" marginTop="var(--standard-spacing)">
						{orderDetails?.name || "Purchase Order"}
					</Text>
					<Text fontSize="xl" marginTop="var(--standard-spacing)">
						₹
						{Number(
							(orderDetails?.pricePerUnit || 0) * (orderDetails?.quantity || 0)
						).toFixed(2)}
					</Text>
					{orderDetails?.desc && (
						<Text fontSize="md" marginTop="var(--standard-spacing)">
							{orderDetails.desc}
						</Text>
					)}
					<Text fontSize="sm" marginTop="var(--standard-spacing)">
						On Confirming, the transaction amount will be added to your next
						billing cycle.
					</Text>
					<HStack
						spacing={5}
						alignItems="center"
						marginTop="var(--standard-spacing)"
					>
						<Button
							colorScheme="blue"
							variant="outline"
							leftIcon={<ConfirmIcon size="1.375rem" />}
							onClick={confirmOrder}
							$paddingMultiplier="1.25"
						>
							Confirm Order
						</Button>
						<Button
							colorScheme="red"
							variant="outline"
							leftIcon={<CancelIcon size="1.375rem" />}
							onClick={declineOrder}
							$variant="hollow"
							$paddingMultiplier="1.125"
						>
							Decline
						</Button>
					</HStack>
				</>
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
