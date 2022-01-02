import Head from "next/head";
import styled from "@emotion/styled";

import {
	Avatar,
	Heading,
	Text,
	Stat,
	StatNumber,
	StatHelpText,
} from "@chakra-ui/react";
import { MdEmail, MdPhone } from "react-icons/md";

import ContentWrapper from "../../components/Layout/ContentWrapper";

import useStore from "../../store/useStore";

const ProfileContentWrapper = styled(ContentWrapper)`
	padding: var(--standard-spacing);
	padding-top: calc(6 * var(--standard-spacing));
	text-align: center;
`;

const UserProfile = () => {
	const user = useStore((state) => state.user);

	return (
		<>
			<Head>
				<title>Dashout - User Profile</title>
			</Head>
			<ProfileContentWrapper centerContent>
				<Avatar
					name={user?.display_name || user?.displayName || ""}
					src={user?.photo_url || user?.photoURL}
					size="2xl"
					cursor="pointer"
				/>
				<Heading marginTop="1.5rem" display="flex" alignItems="center">
					{user?.display_name || user?.displayName || "Unnamed"}
				</Heading>
				<Stat marginTop="1.5rem">
					<StatNumber>{user?.n_transactions || 0}</StatNumber>
					<StatHelpText>Number Of Transactions</StatHelpText>
				</Stat>
				<Text
					display="flex"
					alignItems="center"
					marginTop="1.5rem"
					fontSize="md"
					color="gray"
				>
					<MdPhone size="1.25rem" />
					&nbsp;{user?.phone_number || "-"}
				</Text>
				<Text
					display="flex"
					marginTop="1.5rem"
					alignItems="center"
					fontSize="md"
					color="gray"
				>
					<MdEmail size="1.25rem" />
					&nbsp;{user?.email || "-"}
				</Text>

				<Text marginTop="1.5rem" fontSize="sm" color="gray">
					User Since {new Date(user?.created_at || new Date()).toDateString()}
				</Text>
			</ProfileContentWrapper>
		</>
	);
};

export default UserProfile;
