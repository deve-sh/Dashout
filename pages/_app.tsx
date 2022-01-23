import Head from "next/head";
import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Cookie from "js-cookie";

import useStore from "../store/useStore";

import type User from "../types/user";
import auth, { getToken } from "../firebase/authentication";
import { saveUserProfileToFirestore } from "../API/auth";

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
					createdAt: user.metadata.creationTime,
					lastSignIn: user.metadata.lastSignInTime,
				};
				const accessToken = await getToken(false);
				saveUserProfileToFirestore(
					user.uid,
					userToSave,
					(_, dataFromFirestore) => {
						if (dataFromFirestore) {
							Cookie.set("accessToken", accessToken, { expires: 365 });
							setUserInState(dataFromFirestore);
						} else logoutUser();
					}
				);
			} else logoutUser();
		});
	}, []);

	return (
		<>
			<Head>
				<link rel="icon" href="/logo-32.png" />
			</Head>
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
		</>
	);
};

export default AppWrapper;
