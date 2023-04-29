import { ReactiveVar } from "@apollo/client";

export function editListIndex<T>(
    rvar: ReactiveVar<T[]>,
    index: number,
    itemEdits: Partial<T>
) {
    const existing = rvar();
    existing[index] = {
        ...existing[index],
        ...itemEdits,
    };
    rvar([...existing]);
}

export function addToList<T>(rvar: ReactiveVar<T[]>, newItem: T) {
    const existing = rvar();

    rvar([...existing, newItem]);
}

export function rmFromList<T>(
    rvar: ReactiveVar<T[]>,
    getId: (item: T) => string,
    idToRm: string
) {
    const existing = rvar();

    rvar(existing.filter((item) => getId(item) !== idToRm));
}
