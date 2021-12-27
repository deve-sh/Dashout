import create from "zustand/vanilla";
import { persist } from "zustand/middleware";

interface State {
	user: any;
	setUser: (user: any) => any;
	isDarkModeActive: boolean;
	isLoading: boolean;
	loaderType: string;
}

const store = create(
	persist(
		(set) => ({
			// User Auth
			user: null,
			setUser: (user = null) => set((state) => ({ ...state, user })),
			// Loader
			isLoading: false,
			loaderType: "loader",
			setLoading: (isLoading = false, loaderType = "loader") =>
				set((state: State) => ({ ...state, isLoading, loaderType })),
			// Dark Mode
			isDarkModeActive: false,
			toggleDarkMode: () =>
				set((state: State) => ({
					...state,
					isDarkModeActive: !state.isDarkModeActive,
				})),
		}),
		{
			name: "dashout-storage",
		}
	)
);

export default store;
