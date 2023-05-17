import React from "react";
import styled from "styled-components";

import FlexRow from "../../Flex/FlexRow";

import History from "./History";
import ActiveJournal from "./SelectJournal";
import Logout from "./Logout";
import Home from "./Home";

type Props = {};

export default (props: Props) => {
    return (
        <PaddingDiv>
            <FixedDiv>
                <SpacingDiv>
                    <OneThirdDiv>
                        <History />
                        <ActiveJournal />
                    </OneThirdDiv>

                    <OneThirdDiv>
                        <Home />
                    </OneThirdDiv>

                    <OneThirdDiv>
                        <Logout />
                    </OneThirdDiv>
                </SpacingDiv>
            </FixedDiv>
        </PaddingDiv>
    );
};

const PaddingDiv = styled.div`
    padding-bottom: 50px;
`;
const FixedDiv = styled.div`
    position: fixed;
    width: 100%;
    z-index: 99;
`;
const SpacingDiv = styled(FlexRow)`
    justify-content: space-between;

    width: auto;
    background-color: ${({ theme }) => theme.colors.accent};
    padding: 10px 20px;
`;

const OneThirdDiv = styled(FlexRow)`
    display: flex;
    flex: 33%;
`;
