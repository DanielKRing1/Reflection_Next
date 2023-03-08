import React from "react";
import styled from "styled-components";

export type FlexContainerProps = Omit<FlexBaseProps, "flexDirection">;
type FlexBaseProps = {
  flexDirection: "row" | "column" | "column-reverse" | "row-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
} & React.HTMLAttributes<HTMLDivElement>;

const FlexBase = styled.div<FlexBaseProps>`
  display: flex;

  justify-content: ${({ justifyContent = "flex-start" }: FlexBaseProps) =>
    justifyContent};
  flex-direction: ${({ flexDirection }: FlexBaseProps) => flexDirection};
  align-items: ${({ alignItems = "center" }: FlexBaseProps) => alignItems};
`;

export default FlexBase;
