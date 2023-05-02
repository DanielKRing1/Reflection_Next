import styled from "styled-components";

type ClickContainerProps = {
    onClick: () => void;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
export default (props: ClickContainerProps) => {
    return <StyledDiv onClick={props.onClick}>{props.children}</StyledDiv>;
};

const StyledDiv = styled.div<ClickContainerProps>`
    cursor: pointer;
`;
