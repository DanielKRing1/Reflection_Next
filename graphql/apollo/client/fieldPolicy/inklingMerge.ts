import { Inkling } from "../../../../types/db";

export default {
    inklings: {
        // Concatenate the incoming list items with
        // the existing list items.
        merge(
            existing: Inkling[] = [],
            incoming: Inkling[] = [],
            { readField }
        ) {
            return incoming;
        },
    },
};
