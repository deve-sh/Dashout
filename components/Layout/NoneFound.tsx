import { Container, Text, Icon } from "@chakra-ui/react";
import { MdFilterList } from "react-icons/md";

const NoneFound = ({ label = "", icon = undefined }) => (
	<Container
		centerContent
		alignItems="center"
		display="flex"
		height="100%"
		width="100%"
		flexFlow="column"
		justifyContent="center"
		minHeight="40vh"
	>
		<Icon as={icon || <MdFilterList fontSize="2.5rem" color="gray" />} />
		<Text marginTop="1.5rem" color="gray" fontSize="md">
			{label}
		</Text>
	</Container>
);

export default NoneFound;
