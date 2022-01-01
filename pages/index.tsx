import Head from "next/head";
import { Box, Image, Stack, Text, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { MdOutlineArrowForward } from "react-icons/md";

import Button from "../components/Button";

const HomePageHero = styled(Stack)`
	@media (min-width: 769px) {
		flex-flow: row;
		max-height: 90vh;
		overflow: hidden;
	}

	.content {
		width: 80%;
		display: flex;
		justify-content: center;
		flex-flow: column;
		padding: var(--standard-spacing);
		max-width: 500px;
		margin: 0 auto;
	}

	.heroimage {
		object-fit: cover;
		max-height: 100%;
		max-width: 100%;
		min-width: 100%;
		object-position: bottom;

		&-container {
			max-height: 50vh;
			overflow: hidden;

			@media (min-width: 769px) {
				width: 45%;
				min-height: 135vh;
				margin: 0;
				transform: rotate(15deg) translateX(5%) translateY(-10%);
			}
		}
	}
`;

const HomePage = () => (
	<>
		<Head>
			<title>Dashout - Buy Now Pay Later</title>
		</Head>
		<HomePageHero>
			<Box className="content">
				<Heading size="2xl">
					Dash Out.
					<br />
					At Checkout!
				</Heading>
				<Text marginTop="25px" color="gray.700" fontSize="lg">
					With 0 Fees. 0 Interest.
					<br />
					It truly is the next gen of shopping experience.
				</Text>
				<Button
					marginTop="25px"
					rightIcon={<MdOutlineArrowForward size="1.25rem" />}
				>
					Check It Out
				</Button>
			</Box>
			<Box className="heroimage-container">
				<Image
					className="heroimage"
					src="/images/home/hero.jpg"
					alt="Purchase"
					loading="lazy"
				/>
			</Box>
		</HomePageHero>
	</>
);

export default HomePage;
