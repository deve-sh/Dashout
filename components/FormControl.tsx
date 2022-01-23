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
	isLoading?: boolean;
	name: string;
	placeholder?: string;
	// For controlled form-control inputs
	onChange?: (e: FormEvent<HTMLInputElement>) => any;
	value?: string;
}

const FormControl = ({
	id,
	type = "text",
	label,
	placeholder = "",
	helperText,
	isRequired = false,
	isInvalid = false,
	isLoading = false,
	onChange = undefined,
	value = undefined,
	name,
}: FormControlProps) => (
	<ChakraFormControl isRequired={isRequired} isInvalid={isInvalid}>
		<FormLabel htmlFor={id}>{label}</FormLabel>
		<Input
			id={id}
			type={type}
			placeholder={placeholder}
			name={name}
			onChange={onChange}
			disabled={isLoading}
			value={value}
		/>
		{helperText && <FormHelperText>{helperText}</FormHelperText>}
	</ChakraFormControl>
);

export default FormControl;
