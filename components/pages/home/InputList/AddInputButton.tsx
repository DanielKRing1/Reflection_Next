// THIRD PARTY
import React from "react";
import { useDispatch } from "react-redux";
import genId from "@asianpersonn/time-id";

// REDUX
import { addEntry } from "../../../../redux/newEntriesSlice";

// TYPES
import { AppDispatch } from "../../../../redux/store";
import MyButton from "../../../generic/Input/MyButton";
import styled from "styled-components";
import MyText from "../../../generic/Input/MyText";

// MY COMPONENTS

// REDUX

// TYPES

type AddInputButtonProps = {};
const AddInputButton = (props: AddInputButtonProps) => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();

  // HANDLERS
  const handleAddEntry = () => {
    dispatch(addEntry({ id: genId(), data: "" }));
  };

  return (
    <>
      <CircleButton onClick={handleAddEntry}>+</CircleButton>
    </>
  );
};

export default AddInputButton;

const CircleButton = styled(MyButton)`
  height: 7vw;
  width: 7vw;

  border-radius: 50%;
  padding: 1rem 1rem;
  margin: 1rem;
`;
