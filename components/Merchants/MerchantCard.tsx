import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { MdOutlineContentCopy } from "react-icons/md";

import copyText from "../../helpers/copyText";
import toasts from "../../helpers/toasts";

const MerchantCard = ({ merchant }) => {
	return (
		<HStack
			padding="var(--standard-spacing)"
			borderRadius="0.25rem"
			border="0.075rem solid var(--bordergrey)"
			marginTop="var(--mid-spacing)"
			alignItems="center"
		>
			<Box flex="0.7" borderRight="0.075rem solid var(--bordergrey)">
				<Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
					{merchant.merchantName}
				</Text>
				₹{Number((merchant?.amountProcessed || 0) / 100).toFixed(2) || 0}
			</Box>
			<Box flex="0.3" display="flex" justifyContent="flex-end">
				<IconButton
					aria-label="Copy"
					colorScheme="blue"
					title="Copy Client ID and Secret"
					variant="ghost"
					onClick={() => {
						copyText(
							JSON.stringify(
								{
									clientId: merchant.clientId,
									clientSecret: merchant.clientSecret,
								},
								null,
								4
							)
						);
						toasts.info("Copied Client Id and Secret to Clipboard");
					}}
				>
					<MdOutlineContentCopy size="1.5rem" />
				</IconButton>
			</Box>
		</HStack>
	);
};

export default MerchantCard;
