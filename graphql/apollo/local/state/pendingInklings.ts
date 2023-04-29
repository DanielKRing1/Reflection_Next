import { makeVar } from "@apollo/client";

import { Inkling, Inklings } from "../../../../db/api/types";
import { addToList, rmFromList } from "./utils";

// Initializes to empty array
export const pendingInklingsVar = makeVar<Inklings>([]);

export const addPendingInkling = (newInkling: Inkling) => {
    addToList(pendingInklingsVar, newInkling);
};

export const rmPendingInkling = (idToRm: string) => {
    rmFromList(pendingInklingsVar, ({ id }) => id, idToRm);
};
