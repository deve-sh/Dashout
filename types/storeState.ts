export default interface State {
	user: any;
	setUser: (user: any) => any;
	isDarkModeActive: boolean;
	isLoading: boolean;
	loaderType: string;
}
