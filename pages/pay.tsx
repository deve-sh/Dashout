import { useRouter } from "next/router";
import { useEffect } from "react";

const PayForOrder = () => {
	const { query } = useRouter();

	useEffect(() => {
		if (
			!query.orderId ||
			!query.clientId ||
			!query.successRedirectTo ||
			!query.failureRedirectTo
		)
			window.location.replace(document.referrer || "about:blank");
	}, []);
};

export default PayForOrder;
