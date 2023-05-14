import { gql } from "@apollo/client";
import { Thought } from "../../../../db/api/types";
import { Dict } from "../../../../types/data";
import { THOUGHT_TYPENAME } from "../../server/typenames";

export default {
    thoughts: {
        // Don't cache separate results based on
        // any of this field's arguments.
        // IMPORTANT: THIS FLAG WILL MAKE ALL QUERY/VARIABLE COMBOS OF THIS TYPE
        //              EXECUTE AGAIN WHEN ANY OF THEM EXECUTE
        //              EVERY QUERY WILL NEED TO BE 'MERGED'
        keyArgs: false,

        // Concatenate the incoming list items with
        // the existing list items.
        merge(
            existing: Thought[] = [],
            incoming: Thought[] = [],
            { cache, mergeObjects, readField }
        ) {
            console.log("Merge Thoughts");
            console.log("existing");
            console.log(existing);
            console.log("incoming");
            console.log(incoming);

            const merged = {};

            // 1. Add existing to merged Dict
            for (const t of Object.values(existing)) {
                merged[
                    cache.identify({
                        __typename: THOUGHT_TYPENAME,
                        timeId: readField("timeId", t),
                    })
                ] = t;
            }

            // 2. Add incoming to merged Dict
            for (const t of Object.values(incoming)) {
                merged[
                    cache.identify({
                        __typename: THOUGHT_TYPENAME,
                        timeId: readField("timeId", t),
                    })
                ] = t;
            }

            console.log(merged);

            return Object.values(merged);
        },
    },
};
