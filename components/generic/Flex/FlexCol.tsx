import React, { forwardRef } from "react";

import FlexBase, { FlexContainerProps } from "./FlexBase";

const FlexCol = forwardRef<HTMLDivElement, FlexContainerProps>((props, ref) => {
  const { children } = props;

  return (
    <FlexBase ref={ref} flexDirection="column" {...props}>
      {children}
    </FlexBase>
  );
});

export default FlexCol;
