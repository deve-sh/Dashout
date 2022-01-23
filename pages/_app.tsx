import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Cookie from "js-cookie";

import useStore from "../store/useStore";

import type User from "../types/user";
import auth, { getToken } from "../firebase/authentication";

import AppLayout from "../components/Layout";

const AppWrapper = ({ Component, pageProps }) => {
	const setUserInState = useStore((store) => store.setUser);
	const {
		isOpen: showLoginModal,
		onOpen: openLoginModal,
		onClose: closeLoginModal,
	} = useDisclosure();

	const logoutUser = () => {
		Cookie.remove("accessToken");
		setUserInState(null);
		if (auth.currentUser) auth.signOut();
	};

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				// User is signed in.
				let userToSave: User = {
					displayName: user.displayName,
					email: user.email,
					emailVerified: user.emailVerified,
					photoURL: user.photoURL,
					phoneNumber: user.phoneNumber,
					uid: user.uid,
					providerInfo: JSON.parse(JSON.stringify(user.providerData)),
				};
				const accessToken = await getToken(false);
				Cookie.set("accessToken", accessToken, { expires: 365 }); // Don't remove unless Firebase automatically signs the user out.
				if (userToSave) setUserInState(userToSave);
				else logoutUser();
			} else logoutUser();
		});
	}, []);

	return (
		<AppLayout
			openLoginModal={openLoginModal}
			closeLoginModal={closeLoginModal}
			showLoginModal={showLoginModal}
		>
			<Component
				{...pageProps}
				openLoginModal={openLoginModal}
				logoutUser={logoutUser}
			/>
		</AppLayout>
	);
};

export default AppWrapper;
