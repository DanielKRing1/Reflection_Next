import styled from "styled-components";

type MyButtonProps = {
    color?: string;
    borderColor?: string;
    cursor?: "pointer" | "text";
};
const MyButton = styled.button<MyButtonProps>`
    box-sizing: border-box;
    max-width: 100%;

    background-color: ${({ theme, color }) => color || theme.colors.main};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ borderColor }) => borderColor};
    font-size: ${({ theme }) => theme.fonts.md};
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: ${({ cursor }) => cursor || "pointer"};
`;

export default MyButton;

export const MyButtonNoMargin = styled(MyButton)`
    margin: 0;
`;
