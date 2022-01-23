import Link from "next/link";
import {
	Box,
	Stack,
	Image,
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

import Button from "../Button";

import useStore from "../../store/useStore";

const AppHeader = styled(Box)`
	position: fixed;
	border-bottom: 0.075rem solid var(--backgroundgrey);
	padding: var(--mini-spacing);
	z-index: 101;
	background: var(--white);
`;

const Logo = styled(Image)`
	max-height: 32px;
`;

const Container = styled(Stack)`
	max-width: 1100px;
	margin: 0 auto;
`;

const Left = styled.div`
	width: 30%;
`;

const Right = styled(Left)`
	width: 70%;
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
			<Container direction="row" alignItems="center">
				<Left>
					<Link href="/">
						<a>
							<Logo src="/logo-64.png" alt="Dashout" />
						</a>
					</Link>
				</Left>
				<Right>
					{typeof window !== "undefined" && (
						<ButtonGroup spacing="3">
							<IconButton
								aria-label="Toggle Dark Mode"
								colorScheme={isDarkModeActive ? "yellow" : "blue"}
								variant="ghost"
								onClick={toggleDarkModeForApp}
							>
								{isDarkModeActive ? <FaSun /> : <FaMoon />}
							</IconButton>
							{!stateUser ? (
								<Button
									colorScheme="blue"
									variant="outline"
									leftIcon={<LoginIcon size="1.375rem" />}
									onClick={openLoginModal}
									$variant="hollow"
									$noMinWidth
									$paddingMultiplier="1.25"
								>
									Login
								</Button>
							) : (
								<HStack spacing="0.5rem">
									<Link href="/user/tab">
										<a>
											<IconButton
												aria-label="My Tab"
												colorScheme="blue"
												variant="ghost"
											>
												<FaWallet />
											</IconButton>
										</a>
									</Link>
									<Link href={`/profile/${stateUser.uid}`}>
										<a>
											<IconButton
												aria-label="Profile"
												colorScheme="blue"
												variant="ghost"
											>
												<FaUserCircle />
											</IconButton>
										</a>
									</Link>
									<Button
										colorScheme="blue"
										variant="outline"
										className="logoutbutton"
										leftIcon={<LogoutIcon size="1.375rem" />}
										onClick={logoutUser}
										$variant="hollow"
										$noMinWidth
										$paddingMultiplier="1.25"
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
