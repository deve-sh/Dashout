import { Fragment, useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";

import {
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
	useDisclosure,
	Text,
	HStack,
	Box,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

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
import MerchantCard from "../../components/Merchants/MerchantCard";

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
		if (!user?.canCreateMerchants) Router.push("/user/tab");
		else fetchUserMerchants();
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
				closeMerchantCreator();
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
									return acc + Number(merchant?.amountProcessed || 0);
								}, 0) / 100
							).toFixed(2) || 0}
						</StatNumber>
					</Stat>
				</StatGroup>
				<br />
				<HStack>
					<Box flex="0.7">
						<Text fontWeight="bold" fontSize="2xl">
							MERCHANTS
						</Text>
					</Box>
					<Box flex="1.3" justifyContent="flex-end" display="flex">
						<Button onClick={openMerchantCreator} leftIcon={<FaPlus />}>
							Create Merchant
						</Button>
					</Box>
				</HStack>
				{!userMerchants?.length ? (
					<NoneFound label="No Merchants Found" />
				) : (
					userMerchants.map((merchant, index) => (
						<MerchantCard key={merchant?.id || index} merchant={merchant} />
					))
				)}
			</ContentWrapper>
		</>
	);
};

UserMerchants.getInitialProps = setupProtectedRoute();

export default UserMerchants;
