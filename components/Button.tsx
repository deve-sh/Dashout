import { Button as ChakraButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Button = styled(ChakraButton)`
	padding: calc(
		${({ $paddingMultiplier }) => $paddingMultiplier || "1.25"} *
			var(--standard-spacing)
	);
	font-size: var(--standard-spacing);
	color: var(--white);
	width: fit-content;
	min-width: ${({ $noMinWidth }) =>
		!$noMinWidth ? "calc(12.5 * var(--standard-spacing))" : ""};
	background: var(--primary);
	text-transform: capitalize;
	font-weight: 500;
	letter-spacing: calc(0.075 * var(--standard-spacing));

	${({ $variant }) =>
		$variant === "hollow" &&
		"border: calc(0.075 * var(--standard-spacing)) solid var(--primary);"}
	${({ $variant }) => $variant === "hollow" && "background: var(--white);"}
    ${({ $variant }) => $variant === "hollow" && "color: var(--primary);"}
    ${({ $variant }) =>
		$variant === "hollow"
			? `
    &:hover,
	&:focus,
	&:active {
		background: var(--white);
        color: var(--primary);
        border: calc(0.075 * var(--standard-spacing)) solid var(--primary);
	}`
			: `
    &:hover,
	&:focus,
	&:active {
		background: var(--primary);
	}`}
`;

export default Button;
