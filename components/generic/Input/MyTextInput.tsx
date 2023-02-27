import styled from "styled-components";

type MyTextInputProps = {
  color?: string;
};
const MyTextInput = styled.input<MyTextInputProps>`
  background-color: ${({ theme, color }) => color || theme.colors.main};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fonts.md};
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

export default MyTextInput;
