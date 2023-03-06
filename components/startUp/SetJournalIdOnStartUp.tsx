// THIRD PARTY
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DEFAULT_JOURNAL_METADATA } from "../../db/api/types";

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
    dispatch(
      startSetActiveJournalId({
        journalId: null,
      })
    );
    console.log("hi!");
  }, []);

  return <>{children}</>;
};

export default SetJournalIdOnStartUp;
