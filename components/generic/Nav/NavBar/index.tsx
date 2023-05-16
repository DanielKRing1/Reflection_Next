import React from "react";
import styled from "styled-components";

import FlexRow from "../../Flex/FlexRow";

import History from "./History";
import ActiveJournal from "./SelectJournal";
import Logout from "./Logout";

type Props = {};

export default (props: Props) => {
    return (
        <StyledParentPadding>
            <StyledFixedContainer>
                <StyledContent>
                    <FlexRow>
                        <History />
                        <ActiveJournal />
                    </FlexRow>

                    <FlexRow>
                        <Logout />
                    </FlexRow>
                </StyledContent>
            </StyledFixedContainer>
        </StyledParentPadding>
    );
};

const StyledParentPadding = styled.div`
    padding-bottom: 50px;
`;
const StyledFixedContainer = styled.div`
    position: fixed;
    width: 100%;
    z-index: 99;
`;
const StyledContent = styled(FlexRow)`
    justify-content: space-between;

    width: auto;
    background-color: ${({ theme }) => theme.colors.accent};
    padding: 10px 20px;
`;
