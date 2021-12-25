import type { NextApiRequest, NextApiResponse } from "next";

export default async function getOrderStatus(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const error = (status: number, message: string) =>
		res.status(status).json({
			error: message,
			message,
		});

	try {
	} catch (err) {}
}