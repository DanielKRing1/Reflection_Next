import { makeVar } from "@apollo/client";

import { Reflection } from "../../../../db/api/types";
import { editListIndex } from "./utils";

// INKLINGS
// Initializes to empty array
export const inklingReflectionsVar = makeVar<Reflection[]>([]);

export const initInklingReflections = (inklingReflections: Reflection[]) => {
    inklingReflectionsVar(inklingReflections);
};

export const editInklingReflections = (index: number, decision: number) => {
    editListIndex(inklingReflectionsVar, index, { data: decision });
};

export const getInklingReflections = () => inklingReflectionsVar();

// THOUGHTS

export const thoughtReflectionsVar = makeVar<Reflection[]>([]);

export const initThoughtReflections = (thoughtReflections: Reflection[]) => {
    thoughtReflectionsVar(thoughtReflections);
};

export const editThoughtReflections = (index: number, decision: number) => {
    editListIndex(thoughtReflectionsVar, index, { data: decision });
};

export const getThoughtReflections = () => thoughtReflectionsVar();
