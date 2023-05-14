import styled, { useTheme } from "styled-components";
import { getDate, getMonthName, getYear } from "../../../utils/date";
import FlexCol from "../Flex/FlexCol";
import FlexRow from "../Flex/FlexRow";
import MyText from "../Text/MyText";

type DMYCardProps = {
    date: Date;
};
export default (props: DMYCardProps) => {
    const { date } = props;

    const theme = useTheme();

    return (
        <StyledContainer>
            <FlexCol>
                <FlexRow>
                    <StyledText>
                        {getMonthName(date).slice(0, 3)} {getDate(date)}
                    </StyledText>
                </FlexRow>

                <StyledText>{getYear(date)}</StyledText>
            </FlexCol>
        </StyledContainer>
    );
};

// STYLED COMPONENTS
const StyledText = styled(MyText)`
    padding: 0;
    margin: 0;
`;

const StyledContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.main};
    padding: 20px 20px;
    border-radius: 5px;
`;
