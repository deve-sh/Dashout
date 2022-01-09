// Route to hit when a user logs in to the app using Firebase Authentication, in order to store their details in the database.
import type { NextApiRequest, NextApiResponse } from "next";

import verifyIDToken from "../../helpers/verifyIDToken";

import query from "../../db/query";
import User from "../../types/user";

import {
	CREATE_USER,
	FETCH_USER_BY_UID,
	UPDATE_USER,
} from "../../queries/user";

export default async function setupUser(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const error = (status: number, message: string) =>
		res.status(status).json({
			error: message,
			message,
		});
	try {
		const { authorization } = req.headers;
		if (!authorization) return error(403, "Unauthozied");

		const decodedToken = await verifyIDToken(authorization);
		if (!decodedToken || !decodedToken.uid) return error(403, "Unauthorized");

		const { user } = req.body as { user: User };
		if (!user || user.uid !== decodedToken.uid)
			return error(400, "Incomplete information.");

		const convertFirebaseUserToDatabaseEntry = (userObject: User) => ({
			uid: userObject.uid,
			email: userObject.email,
			email_verified: userObject?.emailVerified,
			provider_info: JSON.stringify(userObject?.providerInfo || {}),
			display_name: userObject.displayName,
			photo_url: userObject.photoURL,
			phone_number: userObject.phoneNumber,
			disabled: userObject.disabled,
		});
		const { error: userFetchingError, results } = await query(
			FETCH_USER_BY_UID,
			[user.uid]
		);
		if (userFetchingError) throw userFetchingError;

		const userForDatabase = convertFirebaseUserToDatabaseEntry(user);

		if (results.length) {
			// User already exists
			await query(UPDATE_USER, [
				userForDatabase.uid,
				userForDatabase.email,
				userForDatabase.email_verified || false,
				userForDatabase.phone_number || null,
				userForDatabase.photo_url || "",
				userForDatabase.disabled || false,
				userForDatabase.display_name,
				userForDatabase.provider_info || "{}",
				userForDatabase.uid,
			]);
		} else {
			// Add user to database.
			await query(CREATE_USER, [
				userForDatabase.uid,
				userForDatabase.email,
				userForDatabase.email_verified || false,
				userForDatabase.display_name,
				userForDatabase.phone_number || null,
				userForDatabase.provider_info || "{}",
				userForDatabase.photo_url || "",
				userForDatabase.disabled || false,
			]);
		}

		return res.status(200).json({
			message: "Setup User In database successfully.",
			user: (await query(FETCH_USER_BY_UID, [user.uid])).results[0],
		});
	} catch (err) {
		return error(500, err.message);
	}
}
