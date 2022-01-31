import Link from "next/link";
import { Box, Stat, StatNumber, Tooltip, Text, VStack } from "@chakra-ui/react";
import type Transaction from "../types/transaction";

import { FaClock } from "react-icons/fa";

interface TransactionTileProps {
	transaction: Transaction;
}

const TransactionTile = ({ transaction }: TransactionTileProps) => {
	return transaction ? (
		<div>
			<Link href={`/pay/${transaction.order}`}>
				<a target="_blank" rel="noopener noreferrer">
					<Box
						p={5}
						mb={10}
						shadow="md"
						borderRadius="0.25rem"
						border="dashed green"
					>
						<VStack>
							{transaction?.orderDetails?.name ? (
								<Box display="flex" justifyContent="flex-start" width="100%">
									<Text color="gray">{transaction?.orderDetails?.name}</Text>
								</Box>
							) : (
								""
							)}
							<Box display="flex" alignItems="center" width="100%">
								<Stat flex="5" minWidth="50%">
									<StatNumber ml={5}>
										₹ {Number((transaction.amount as any) / 100).toFixed(2)}
									</StatNumber>
								</Stat>
							</Box>
							<Box width="100%">
								<Text fontSize="sm" color="gray">
									<FaClock />{" "}
									{transaction?.createdAt?.toDate?.()?.toDateString?.()}{" "}
									{transaction?.createdAt
										?.toDate?.()
										?.toTimeString?.()
										.slice(0, 8)}
								</Text>
							</Box>
						</VStack>
					</Box>
				</a>
			</Link>
		</div>
	) : (
		<></>
	);
};

export default TransactionTile;
