import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";

import {
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
	HStack,
	Box,
	Text,
} from "@chakra-ui/react";
import { FaMoneyCheck } from "react-icons/fa";

import setupProtectedRoute from "../../helpers/setupProtectedRoute";
import ContentWrapper from "../../components/Layout/ContentWrapper";
import Button from "../../components/Button";
import TransactionTile from "../../components/TransactionTile";
import NoneFound from "../../components/Layout/NoneFound";

import useUser from "../../hooks/useUser";
import User from "../../types/user";
import Transaction from "../../types/transaction";
import { getUserTransactions } from "../../API/transactions";
import toasts from "../../helpers/toasts";

const UserTab = () => {
	const user = useUser() || ({} as User);

	const [userTransactions, setUserTransactions] = useState([]);
	const [hasMoreTransactions, setHasMoreTransactions] = useState(true);
	const userTransactionsStartAfter = useRef(null);

	const fetchUserTransactions = async () => {
		if (!user || !user.uid || !hasMoreTransactions) return;
		getUserTransactions(
			user.uid,
			userTransactionsStartAfter.current,
			(err, transactionsList) => {
				if (err) return toasts.error(err);
				setUserTransactions(
					transactionsList.map((transactionDoc) => transactionDoc.data())
				);
				userTransactionsStartAfter.current =
					transactionsList[transactionsList.length - 1];
				setHasMoreTransactions(transactionsList.length >= 10);
			}
		);
	};

	useEffect(() => {
		fetchUserTransactions();
	}, [user.uid]);

	return (
		<>
			<Head>
				<title>Dashout - {user.displayName || "User"}'s Tab</title>
			</Head>
			<ContentWrapper>
				<StatGroup
					marginTop="var(--standard-spacing)"
					border="0.01rem solid var(--bordergrey)"
					borderRadius="0.25rem"
					padding="var(--standard-spacing)"
				>
					<Stat>
						<StatLabel>Transactions</StatLabel>
						<StatNumber>{user.nTransactions || 0}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Transaction Amount</StatLabel>
						<StatNumber>
							₹{Number((user.totalTransactionAmount || 0) / 100).toFixed(2)}
						</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Amount Repaid</StatLabel>
						<StatNumber>
							₹{Number((user.totalAmountRepaid || 0) / 100).toFixed(2)}
						</StatNumber>
					</Stat>
				</StatGroup>
				<br />
				<HStack>
					<Box flex="0.7">
						<Text fontWeight="bold" fontSize="2xl">
							TRANSACTIONS
						</Text>
					</Box>
					{user?.canCreateMerchants && (
						<Box flex="1.3" justifyContent="flex-end" display="flex">
							<Link href="/user/merchants">
								<a>
									<Button>View Your Merchants</Button>
								</a>
							</Link>
						</Box>
					)}
				</HStack>
				<br />
				{userTransactions.length ? (
					<>
						{userTransactions.map((transaction: Transaction) => (
							<TransactionTile key={transaction.id} transaction={transaction} />
						))}
						{hasMoreTransactions && (
							<Box textAlign="center" mt={5}>
								<Button $variant="hollow" onClick={fetchUserTransactions}>
									Load More Transactions
								</Button>
							</Box>
						)}
					</>
				) : (
					<NoneFound
						label="No Transactions To Show Yet"
						icon={() => <FaMoneyCheck size="5rem" color="gray" />}
					/>
				)}
			</ContentWrapper>
		</>
	);
};

UserTab.getInitialProps = setupProtectedRoute();

export default UserTab;
