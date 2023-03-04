// THIRD PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewJournalId } from "../../../../../redux/createJournalSlice";
import { RootState } from "../../../../../redux/store";

// MY COMPONENTS
import MyTextInput from "../../../../generic/Input/MyTextInput";

type InputListProps = {};
const InputList = (props: InputListProps) => {
  4;
  // REDUX
  const dispatch = useDispatch();
  const { newJournalId } = useSelector(
    (state: RootState) => state.createJournalSlice
  );

  // HANDLERS
  const handleEditJournalId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.value;

    dispatch(setNewJournalId(id));
  };

  return (
    <MyTextInput
      placeholder="Journal Name..."
      value={newJournalId}
      onChange={handleEditJournalId}
    />
  );
};

export default InputList;
