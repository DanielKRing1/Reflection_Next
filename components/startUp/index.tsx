// This is a wrapper for all 'on start up' components - components that should do something when the app first loads

import React from "react";
import SetJournalIdOnStartUp from "./SetJournalIdOnStartUp";

type Props = {
  children: React.ReactNode;
};
const OnStartUpWrapper = ({ children }: Props) => {
  return <SetJournalIdOnStartUp>{children}</SetJournalIdOnStartUp>;
};

export default OnStartUpWrapper;
