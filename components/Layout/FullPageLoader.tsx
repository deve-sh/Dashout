import styled from "@emotion/styled";
import { Spinner, Skeleton } from "@chakra-ui/react";

const FullPageLoaderContainer = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	z-index: 1000;
	background: var(--white);
	bottom: 0;
	left: 0;
	top: 0;
	right: 0;
	overflow: hidden;
`;

const StyledLoaderSkeleton = styled(Skeleton)`
	min-height: 100vh;
	width: 100vw;
`;

const FullPageLoader = ({ type = "loader" }) => (
	<FullPageLoaderContainer>
		{type === "loader" ? (
			<Spinner size="xl" thickness="4px" color="green.500" />
		) : (
			<StyledLoaderSkeleton />
		)}
	</FullPageLoaderContainer>
);

export default FullPageLoader;
