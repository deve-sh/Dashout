import { Global, css } from "@emotion/react";

const GlobalStyles = ({ darkMode = false }) => (
	<Global
		styles={css`
			:root {
				--white: ${!darkMode ? "#ffffff" : "#1A202C"};
				--black: ${!darkMode ? "#1A202C" : "#ffffff"};
				--darkgrey: #313131;

				--bordergrey: #cfcfcf;
				--backgroundgrey: ${!darkMode
					? "#efefef"
					: "var(--chakra-colors-gray-600)"};

				--primary: #0987a0;
				--secondary: #185966;

				--line-height: 1.61;

				--standard-spacing: 1rem;
				--mid-spacing: 0.875rem;
				--mini-spacing: 0.75rem;
			}

			input::-webkit-outer-spin-button,
			input::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}

			/* Firefox */
			input[type="number"] {
				-moz-appearance: textfield;
			}

			body,
			#__next {
				padding: 0;
				margin: 0;
				line-height: var(--line-height);
				font-family: "Roboto", "Lato", sans-serif;
				max-width: 100vw;
				min-height: 100vh;
				overflow-x: hidden;
			}

			html {
				overflow-x: hidden;
				scroll-behavior: smooth;
			}

			* {
				box-sizing: border-box;
			}

			a {
				text-decoration: none;
			}

			@media print {
				.noprint {
					display: none;
				}
			}

			@media (max-width: 768px) {
				.hideonsmall {
					display: none;
				}

				.logoutbutton .chakra-button__icon {
					margin: 0;
					margin-inline-end: 0;
				}
			}
		`}
	/>
);

export default GlobalStyles;
