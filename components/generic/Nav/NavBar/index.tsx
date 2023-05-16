import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import FlexRow from "../../Flex/FlexRow";
import History from "./History";
import ActiveJournal from "./ActiveJournal";
import Logout from "./Logout";

type Props = {};

export default (props: Props) => {
    // ROUTER
    const router = useRouter();

    // HANDLERS
    const handleRouteToHistory = () => {
        router.push("/history");
    };

    const handleLogout = () => {};

    return (
        <StyledContainer>
            <FlexRow>
                <History />
                <ActiveJournal />
            </FlexRow>

            <FlexRow>
                <Logout />
            </FlexRow>
        </StyledContainer>
    );
};

const StyledContainer = styled(FlexRow)`
    justify-content: space-between;

    width: auto;
    background-color: ${({ theme }) => theme.colors.accent};
    padding: 10px 20px;
`;
