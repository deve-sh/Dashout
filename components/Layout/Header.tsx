import Link from "next/link";
import {
	Box,
	Stack,
	Image,
	Button,
	IconButton,
	ButtonGroup,
	HStack,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import styled from "@emotion/styled";
import {
	MdAccountCircle as LoginIcon,
	MdLogout as LogoutIcon,
} from "react-icons/md";
import { FaMoon, FaSun, FaUserCircle, FaWallet } from "react-icons/fa";

import useStore from "../../store/useStore";

const AppHeader = styled(Box)`
	position: fixed;
	border-bottom: 0.075rem solid var(--backgroundgrey);
	padding: var(--mini-spacing);
	z-index: 101;
	background: var(--white);
`;

const Logo = styled(Image)`
	width: 42px;
	height: 42px;
`;

const Container = styled(Stack)`
	max-width: 1100px;
	margin: 0 auto;
`;

const Left = styled.div`
	width: 20%;
`;

const Right = styled(Left)`
	width: 80%;
	text-align: right;
`;

const Header = ({ openLoginModal = () => null, logoutUser = () => null }) => {
	const { toggleColorMode } = useColorMode();

	const stateUser = useStore((state) => state.user);
	const isDarkModeActive = useStore((store) => store.isDarkModeActive);
	const toggleDarkMode = useStore((store) => store.toggleDarkMode);

	const toggleDarkModeForApp = () => {
		toggleColorMode();
		toggleDarkMode(); // Store dark mode in global state as well.
	};

	return (
		<AppHeader w="100%" id="app-header" className="noprint">
			<Container direction="row">
				<Left>
					<Link href="/">
						<a>
							<Logo src="/logo.png" alt="Dashout Logo" />
						</a>
					</Link>
				</Left>
				<Right>
					{typeof window !== "undefined" && (
						<ButtonGroup spacing="3">
							<IconButton
								aria-label="Toggle Dark Mode"
								colorScheme={isDarkModeActive ? "yellow" : "teal"}
								variant="ghost"
								onClick={toggleDarkModeForApp}
							>
								{isDarkModeActive ? <FaSun /> : <FaMoon />}
							</IconButton>
							{!stateUser ? (
								<Button
									colorScheme="teal"
									variant="outline"
									leftIcon={<LoginIcon size="1.375rem" />}
									onClick={openLoginModal}
								>
									Login
								</Button>
							) : (
								<HStack spacing="0.5rem">
									<Link href="/user/tab">
										<a>
											<IconButton
												aria-label="My Tab"
												colorScheme="teal"
												variant="ghost"
											>
												<FaWallet />
											</IconButton>
										</a>
									</Link>
									<Link href="/user/profile">
										<a>
											<IconButton
												aria-label="Profile"
												colorScheme="teal"
												variant="ghost"
											>
												<FaUserCircle />
											</IconButton>
										</a>
									</Link>
									<Button
										colorScheme="teal"
										variant="outline"
										className="logoutbutton"
										leftIcon={<LogoutIcon size="1.375rem" />}
										onClick={logoutUser}
									>
										<span
											className="hideonsmall"
											style={{ marginLeft: "0.5rem" }}
										>
											Logout
										</span>
									</Button>
								</HStack>
							)}
						</ButtonGroup>
					)}
				</Right>
			</Container>
		</AppHeader>
	);
};

export default Header;
