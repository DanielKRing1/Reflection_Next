import React, { forwardRef } from "react";

import FlexBase, { FlexContainerProps } from "./FlexBase";

const FlexRow = forwardRef<HTMLDivElement, FlexContainerProps>((props, ref) => {
  const { children } = props;

  return (
    <FlexBase ref={ref} flexDirection="row" {...props}>
      {children}
    </FlexBase>
  );
});

export default FlexRow;
