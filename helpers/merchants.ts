import query from "../db/query";
import { FETCH_MERCHANT_BY_CREDENTIALS } from "../queries/merchant";

export const fetchMerchantByCredentials = async ({
	clientId,
	clientSecret,
}) => {
	const { results: merchants } = await query(FETCH_MERCHANT_BY_CREDENTIALS, [
		clientId,
		clientSecret,
	]);
	return merchants[0] || null;
};
