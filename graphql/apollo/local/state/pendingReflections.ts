import { makeVar } from "@apollo/client";

import { Dict } from "../../../../types/data";

export type LocalReflection = {
    keep: boolean;
};

// INKLINGS
// Initializes to empty array
const inklingReflectionsVar = makeVar<Dict<LocalReflection>>({});

export const initInklingReflections = (
    inklingReflections: Dict<LocalReflection>
) => {
    inklingReflectionsVar(inklingReflections);
};

export const editInklingReflection = (id: string, keep: boolean) => {
    const existing = inklingReflectionsVar();

    inklingReflectionsVar({ ...existing, [id]: { ...existing[id], keep } });
};

export const getInklingReflections = (): Dict<LocalReflection> =>
    inklingReflectionsVar();

export const clearInklingReflections = (): Dict<LocalReflection> =>
    inklingReflectionsVar({});

// THOUGHTS

const thoughtReflectionsVar = makeVar<Dict<LocalReflection>>({});

export const initThoughtReflections = (
    thoughtReflections: Dict<LocalReflection>
) => {
    thoughtReflectionsVar(thoughtReflections);
};

export const editThoughtReflection = (id: string, keep: boolean) => {
    const existing = thoughtReflectionsVar();

    thoughtReflectionsVar({ ...existing, [id]: { ...existing[id], keep } });
};

export const getThoughtReflections = () => thoughtReflectionsVar();

export const clearThoughtReflections = () => thoughtReflectionsVar({});
