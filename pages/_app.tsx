import { useEffect } from "react";

import { useDisclosure } from "@chakra-ui/react";

import useStore from "../store/useStore";

import auth from "../firebase/authentication";
import request from "../helpers/request";
import User from "../types/user";

import AppLayout from "../components/Layout";

const AppWrapper = ({ Component, pageProps }) => {
	const setUserInState = useStore((store) => store.setUser);
	const {
		isOpen: showLoginModal,
		onOpen: openLoginModal,
		onClose: closeLoginModal,
	} = useDisclosure();

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
				setUserInState(userToSave);
			}
		});
	}, []);

	return (
		<AppLayout
			openLoginModal={openLoginModal}
			closeLoginModal={closeLoginModal}
			showLoginModal={showLoginModal}
		>
			<Component {...pageProps} openLoginModal={openLoginModal} />
		</AppLayout>
	);
};

export default AppWrapper;
