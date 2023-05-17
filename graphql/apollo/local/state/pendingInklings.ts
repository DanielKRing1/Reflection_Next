import { makeVar } from "@apollo/client";

import { Inkling, Inklings } from "../../../../db/api/types";
import { addToList, editListIndex, rmFromList } from "./utils";

// Initializes to empty array
export const pendingInklingsVar = makeVar<Inklings>([]);

export const getPendingInklings = () => pendingInklingsVar();

export const clearPendingInklings = () => {
    pendingInklingsVar([]);
};

export const addPendingInkling = (newInkling: Inkling) => {
    addToList(pendingInklingsVar, newInkling);
};

export const editPendingInkling = (index: number, newText: string) => {
    editListIndex(pendingInklingsVar, index, { text: newText });
};

export const rmPendingInkling = (index: number) => {
    rmFromList(pendingInklingsVar, index);
};
