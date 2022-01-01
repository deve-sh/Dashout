/**
 * Common App Layout
 */

import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import AppContentContainer from "./AppContentContainer";

import useStore from "../../store/useStore";

const LoginModal = dynamic(() => import("../Authentication/LoginModal"));

const AppLayout = ({
	children,
	logoutUser = () => null,
	showLoginModal = false,
	openLoginModal = () => null,
	closeLoginModal = () => null,
}) => {
	const isDarkModeActive = useStore((store) => store.isDarkModeActive);

	// User Authentication
	const stateUser = useStore((store) => store.user);

	console.log(isDarkModeActive, stateUser);

	return (
		<ChakraProvider>
			<GlobalStyles darkMode={isDarkModeActive} />
			<Header logoutUser={logoutUser} openLoginModal={openLoginModal} />
			{!stateUser && (
				<LoginModal closeModal={closeLoginModal} isOpen={showLoginModal} />
			)}
			<AppContentContainer>{children}</AppContentContainer>
		</ChakraProvider>
	);
};

export default AppLayout;
