// THIRD PARTY
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// REDUX
import { startSetActiveJournalId } from "../../redux/activeJournalSlice";

// TYPES
import { AppDispatch } from "../../redux/store";

type Props = {
  children: React.ReactNode;
};
const SetJournalIdOnStartUp = ({ children }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetActiveJournalId(undefined));
    console.log("hi!");
  }, []);

  return <>{children}</>;
};

export default SetJournalIdOnStartUp;
