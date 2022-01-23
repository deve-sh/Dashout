import {
	FormControl as ChakraFormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
} from "@chakra-ui/react";
import { FormEvent } from "react";

interface FormControlProps {
	id: string;
	type?: string;
	helperText?: string;
	label: string;
	isRequired?: boolean;
	isInvalid?: boolean;
	name: string;
	// For controlled form-control inputs
	onChange?: (e: FormEvent<HTMLInputElement>) => any;
	value?: string;
}

const FormControl = ({
	id,
	type = "text",
	label,
	helperText,
	isRequired = false,
	isInvalid = false,
	onChange = undefined,
	value = undefined,
	name,
}: FormControlProps) => (
	<ChakraFormControl isRequired={isRequired} isInvalid={isInvalid}>
		<FormLabel htmlFor={id}>{label}</FormLabel>
		<Input id={id} type={type} name={name} onChange={onChange} value={value} />
		{helperText && <FormHelperText>{helperText}</FormHelperText>}
	</ChakraFormControl>
);

export default FormControl;
