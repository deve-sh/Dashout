import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

const ReusableModal = ({
	children,
	title = "",
	isOpen = false,
	onClose = () => null,
	actionButton = undefined,
}) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />
		<ModalContent>
			<ModalHeader>{title}</ModalHeader>
			<ModalCloseButton />
			<ModalBody>{children}</ModalBody>

			<ModalFooter>
				<Button colorScheme="blue" mr={3} onClick={onClose}>
					Close
				</Button>
				{actionButton || ""}
			</ModalFooter>
		</ModalContent>
	</Modal>
);

export default ReusableModal;
