import { Inkling } from "../../../../db/api/types";

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
