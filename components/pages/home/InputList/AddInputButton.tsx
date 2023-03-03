// THIRD PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import genId from "@asianpersonn/time-id";

// MY COMPONENTS
import CircleButton from "../../../generic/Button/CircleButton";

// REDUX
import { addEntry } from "../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../redux/store";

type AddInputButtonProps = {};
const AddInputButton = (props: AddInputButtonProps) => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { emptyEntries } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );

  // HANDLERS
  const handleAddEntry = () => {
    // Cannot add entry if empty entries exist
    if (Object.keys(emptyEntries).length > 0) return;

    dispatch(addEntry({ id: genId(), data: "" }));
  };

  return (
    <>
      <CircleButton onClick={handleAddEntry} radius={5}>
        +
      </CircleButton>
    </>
  );
};

export default AddInputButton;
