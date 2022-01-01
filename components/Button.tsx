import { Button as ChakraButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Button = styled(ChakraButton)`
	border-radius: calc(5 * var(--standard-spacing));
	padding: calc(1.5 * var(--standard-spacing));
	font-size: calc(1.125 * var(--standard-spacing));
	color: var(--white);
	width: fit-content;
	min-width: calc(12.5 * var(--standard-spacing));
	background: var(--primary);
	text-transform: capitalize;
	font-weight: 500;
	letter-spacing: calc(0.075 * var(--standard-spacing));

	&:hover,
	&:focus,
	&:active {
		background: var(--primary);
	}
`;

export default Button;
