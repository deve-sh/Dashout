import { Fragment, useEffect, useState } from "react";
import Head from "next/head";

import {
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
	useDisclosure,
	Heading,
	HStack,
	Box,
} from "@chakra-ui/react";

import setupProtectedRoute from "../../helpers/setupProtectedRoute";
import ContentWrapper from "../../components/Layout/ContentWrapper";
import MerchantCreatorModal from "../../components/Merchants/MerchantCreatorModal";

import {
	getMerchantsForUser,
	createMerchantForUser,
} from "../../API/merchants";

import useUser from "../../hooks/useUser";
import User from "../../types/user";
import toasts from "../../helpers/toasts";
import NoneFound from "../../components/Layout/NoneFound";
import Button from "../../components/Button";

const UserMerchants = () => {
	const user = useUser() || ({} as User);
	const {
		isOpen: isMerchantCreatorOpen,
		onOpen: openMerchantCreator,
		onClose: closeMerchantCreator,
	} = useDisclosure();
	const [isMerchantCreating, setIsMerchantCreating] = useState(false);

	const [userMerchants, setUserMerchants] = useState([]);

	const fetchUserMerchants = async () => {
		if (!user || !user.uid) return;
		getMerchantsForUser(user.uid, (err, merchantsList) => {
			if (err) return toasts.error(err);
			setUserMerchants(
				merchantsList.map((merchantsDoc) => merchantsDoc.data())
			);
		});
	};

	useEffect(() => {
		fetchUserMerchants();
	}, [user.uid]);

	const createMerchant = (merchantData) => {
		setIsMerchantCreating(true);
		if (userMerchants.length >= 10)
			return toasts.error("You cannot be part of more than 10 merchants.");
		createMerchantForUser(
			user.uid,
			merchantData,
			(err, createdMerchantInDatabase) => {
				setIsMerchantCreating(false);
				if (err) return toasts.error(err);
				setUserMerchants((merchants) => [
					createdMerchantInDatabase,
					...merchants,
				]);
				toasts.success("Created Merchants successfully");
			}
		);
	};

	return (
		<>
			<Head>
				<title>Dashout - Merchants</title>
			</Head>
			<ContentWrapper>
				<MerchantCreatorModal
					isOpen={isMerchantCreatorOpen}
					onClose={closeMerchantCreator}
					onSubmit={createMerchant}
					isLoading={isMerchantCreating}
				/>
				<StatGroup
					marginTop="var(--standard-spacing)"
					border="0.01rem solid var(--bordergrey)"
					borderRadius="0.25rem"
					padding="var(--standard-spacing)"
				>
					<Stat>
						<StatLabel>Merchants</StatLabel>
						<StatNumber>{userMerchants?.length || 0}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Total Processed Amount</StatLabel>
						<StatNumber>
							₹
							{Number(
								userMerchants?.reduce?.((acc, merchant) => {
									return acc + Number(merchant.amountProcessed);
								}, 0) / 100
							).toFixed(2) || 0}
						</StatNumber>
					</Stat>
				</StatGroup>
				<br />
				<HStack>
					<Box flex="1">
						<Heading>MERCHANTS</Heading>
					</Box>
					<Box flex="1" justifyContent="flex-end" display="flex">
						<Button onClick={openMerchantCreator}>Create Merchant</Button>
					</Box>
				</HStack>
				{!userMerchants?.length ? (
					<NoneFound label="No Merchants Found" />
				) : (
					userMerchants.map((merchant) => (
						<Fragment key={merchant.id}></Fragment>
					))
				)}
			</ContentWrapper>
		</>
	);
};

UserMerchants.getInitialProps = setupProtectedRoute();

export default UserMerchants;
