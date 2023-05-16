import styled from "styled-components";

type Props = {
    x?: number;
    y?: number;
};
export default styled.div<Props>`
    padding: ${({ x, y }) => `${(y || 0) / 2}px ${(x || 0) / 2}px`};
`;
