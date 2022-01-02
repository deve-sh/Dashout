import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Cookie from "js-cookie";

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

	const logoutUser = () => {
		Cookie.remove("accessToken");
		setUserInState(null);
		if (auth.currentUser) auth.signOut();
	};

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
				const accessToken = await auth.currentUser.getIdToken(false);
				Cookie.set("accessToken", accessToken, { expires: 365 }); // Don't remove unless Firebase automatically signs the user out.
				const { user: userFromDatabase } = await request({
					endpoint: "/api/setupUser",
					data: { user: userToSave },
					requestType: "post",
					options: {
						headers: {
							authentication: accessToken,
						},
					},
				});
				if (userToSave && userFromDatabase)
					setUserInState({ ...userToSave, ...userFromDatabase });
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
