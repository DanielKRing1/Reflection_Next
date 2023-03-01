import styled from "styled-components";

import MyButton from "./MyButton";

type CircleButtonProps = {
  radius: number;
};
const CircleButton = styled(MyButton)<CircleButtonProps>`
  height: ${({ radius }) => `${radius}vw`};
  width: ${({ radius }) => `${radius}vw`};

  border-radius: 50%;
  padding: 1rem 1rem;
  margin: 1rem;
`;

export default CircleButton;
