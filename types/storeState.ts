import User from "./user";

export default interface State {
	user: null | undefined | User;
	setUser: (user: any) => any;
	isDarkModeActive: boolean;
	isLoading: boolean;
	loaderType: string;
}
