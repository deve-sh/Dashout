import { useState } from "react";
import { Button } from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { loginWithGoogle, loginWithGithub } from "../../API/auth";
import toasts from "../../helpers/toasts";

const Authentication = () => {
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const signInUser = (mode = "google") => {
		// Use 'mode' in the future to distinguish between multiple OAuth Based login modes.
		setIsLoggingIn(true);
		const callback = (err) => {
			setIsLoggingIn(false);
			if (err) return toasts.error(err);
		};
		if (mode === "google") loginWithGoogle(callback);
		else if (mode === "google") loginWithGithub(callback);
	};

	return (
		<>
			<Button
				isLoading={isLoggingIn}
				isFullWidth
				variant="outline"
				colorScheme="gray"
				leftIcon={<FcGoogle size="1.5rem" />}
				onClick={() => signInUser("google")}
				size="lg"
			>
				Sign In With Google
			</Button>
			<Button
				isLoading={isLoggingIn}
				isFullWidth
				variant="outline"
				colorScheme="gray"
				leftIcon={<FaGithub size="1.5rem" />}
				onClick={() => signInUser("github")}
				size="lg"
				marginTop="15px"
			>
				Sign In With Github
			</Button>
		</>
	);
};

export default Authentication;
