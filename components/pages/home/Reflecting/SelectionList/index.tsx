import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

const SelectionList = () => {
  // REDUX
  const {} = useSelector((state: RootState) => state.newThoughtsSlice);
  // 1. TODO Alter Journal Metadata through Redux
  // 2. TODO Alter Journal Entries through Redux
  // 3. TODO Cache new Journal Thoughts through Redux

  return <>{}</>;
};

export default SelectionList;
