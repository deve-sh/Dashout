import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import auth from "../firebase/authentication";
import request from "../helpers/request";
import User from "../types/user";

const AppWrapper = ({ Component, pageProps }) => {
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				// User is signed in.
				let displayName = user.displayName,
					email = user.email,
					emailVerified = user.emailVerified,
					photoURL = user.photoURL,
					phoneNumber = user.phoneNumber,
					uid = user.uid,
					providerData = user.providerData;
				let userToSave: User = {
					displayName,
					email,
					emailVerified,
					photoURL,
					phoneNumber,
					uid,
					providerInfo: JSON.parse(JSON.stringify(providerData)),
				};
				request({
					endpoint: "/api/setupUser",
					data: { user: userToSave },
					requestType: "post",
					options: {
						headers: {
							authentication: await auth.currentUser.getIdToken(false),
						},
					},
				});
			}
		});
	}, []);

	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
};

export default AppWrapper;
