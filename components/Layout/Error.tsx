import { Container, Image, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const ErrorImage = styled(Image)`
	max-width: 45vw;
`;

export default function Error({ errorMessage }) {
	return (
		<Container centerContent maxW="container.xl" padding="1rem">
			<ErrorImage
				src="/error.svg"
				objectFit="cover"
				alt="Error"
			/>
			<br />
			<Text fontSize="lg">{errorMessage}</Text>
		</Container>
	);
}
