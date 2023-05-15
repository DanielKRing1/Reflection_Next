import { forwardRef } from "react";
import styled from "styled-components";

type ClickContainerProps = {
    onClick: () => void;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
export default forwardRef<HTMLDivElement, ClickContainerProps>((props, ref) => {
    return (
        <StyledDiv ref={ref} onClick={props.onClick}>
            {props.children}
        </StyledDiv>
    );
});

const StyledDiv = styled.div<ClickContainerProps>`
    cursor: pointer;
`;
