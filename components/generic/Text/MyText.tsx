import styled from "styled-components";

type MyTextProps = {
    color?: string;
};
const MyText = styled.div<MyTextProps>`
    box-sizing: border-box;
    max-width: 100%;

    background-color: ${({ theme, color }) => color || theme.colors.main};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fonts.md};
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
`;

export default MyText;

export const MyTextNoMargin = styled(MyText)`
    margin: 0;
`;
