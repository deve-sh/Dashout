import { useEffect, useRef } from "react";
import styled from "@emotion/styled";

const AppContent = styled.div`
	padding-top: 15rem;
`;

const AppContentContainer = ({ children }) => {
	const contentContainerRef = useRef(null);

	useEffect(() => {
		const headerElement = document.getElementById("app-header");
		if (contentContainerRef.current && headerElement)
			contentContainerRef.current.style.paddingTop =
				headerElement.offsetHeight + "px";
	}, []);

	return <AppContent ref={contentContainerRef}>{children}</AppContent>;
};

export default AppContentContainer;
