import { createStandaloneToast } from "@chakra-ui/react";

const toastOps = (
	title: string,
	desc?: string,
	status: "info" | "warning" | "success" | "error" = "info"
) => ({
	title,
	description: desc || "",
	status: status || "info",
	duration: 4500,
	isClosable: true,
});

const toasts = {
	info: (message: string, desc?: string): any => {
		const toast = createStandaloneToast();
		return toast(toastOps(message, desc));
	},
	success: (successMessage: string = "", desc?: string): any => {
		const toast = createStandaloneToast();
		return toast(toastOps(successMessage, desc, "success"));
	},
	error: (errorMessage: string = "", desc?: string): any => {
		const toast = createStandaloneToast();
		return toast(toastOps(errorMessage, desc, "error"));
	},
	warn: (warningMessage: string = "", desc?: string): any => {
		const toast = createStandaloneToast();
		return toast(toastOps(warningMessage, desc, "warning"));
	},
};

export default toasts;
