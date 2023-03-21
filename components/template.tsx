// THIRD PARTY
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// MY COMPONENTS

// REDUX

// TYPES
import { Inkling } from "../db/api/types";
import { editInkling } from "../redux/db/newInklingsSlice";
import { AppDispatch, RootState } from "../redux/store";
import Input from "./pages/home/CreateJournal/InputForm/Input";

type TemplateProps = {};
const Template = (props: TemplateProps) => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { newInklings } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );

  // HANDLERS
  const handleEditEntry = (index: number, newEntry: string) => {
    dispatch(editInkling({ index, data: newEntry }));
  };

  return <></>;
};

export default Template;
