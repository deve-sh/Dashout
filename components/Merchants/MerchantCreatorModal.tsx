import { SyntheticEvent, useRef } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import FormControl from "../FormControl";

interface MerchantFormSubmitData {
	merchantName: string;
	photoURL: string;
	merchantEmail: string;
	successRedirect: string;
	errorRedirect: string;
}

interface MerchantCreatorModalProps {
	isOpen: boolean;
	onClose: () => any;
	onSubmit: (formData: MerchantFormSubmitData) => any;
}

const MerchantCreatorModal = ({
	isOpen = false,
	onClose,
	onSubmit,
}: MerchantCreatorModalProps) => {
	const formRef = useRef(null);

	const submitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		const formData = Object.fromEntries(
			new FormData(formRef.current)
		) as unknown as MerchantFormSubmitData;
		onSubmit(formData);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<form onSubmit={submitForm} ref={formRef}>
				<ModalContent>
					<ModalHeader>Create Merchant</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl
							isRequired
							name="merchantName"
							placeholder="Merchant Name"
							label="Merchant Name"
							id="merchantName"
						/>
						<br />
						<FormControl
							isRequired
							name="merchantEmail"
							placeholder="Merchant Email"
							label="Merchant Email"
							id="merchantEmail"
							type="email"
						/>
						<br />
						<FormControl
							isRequired
							name="photoURL"
							placeholder="Merchant Photo URL"
							label="Merchant Photo URL"
							id="photoURL"
							type="url"
						/>
						<br />
						<FormControl
							isRequired
							name="successRedirect"
							placeholder="The URL your users will be redirected to after completing a purchase"
							label="Redirect URL post purchase"
							id="successRedirect"
							type="url"
						/>
						<br />
						<FormControl
							isRequired
							name="errorRedirect"
							placeholder="The URL your users will be redirected to on cancelling a purchase"
							label="Redirect URL post cancelling"
							id="errorRedirect"
							type="url"
						/>
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" colorScheme="red" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="blue" type="submit">
							Secondary Action
						</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
};

export default MerchantCreatorModal;
