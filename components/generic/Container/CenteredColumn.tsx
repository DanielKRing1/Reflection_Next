import FlexCol from "../Flex/FlexCol";
import BoxShadow from "../BoxShadow";
import styled from "styled-components";

type Props = { children: React.ReactNode };
export default ({ children }: Props) => {
    return (
        <FramingDiv>
            <CenteredDiv>
                <BoxShadow>
                    <FlexCol width="100%">{children}</FlexCol>
                </BoxShadow>
            </CenteredDiv>
        </FramingDiv>
    );
};

const FramingDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const CenteredDiv = styled(FlexCol)`
    width: 70%;

    border-width: 5rem;
    border: solid black;
    border-radius: 0.4rem;
`;
