import { FieldFunctionOptions, gql } from "@apollo/client";

import { genCacheId } from "../../local/utils/id";
import { THOUGHT_TYPENAME } from "../../server/typenames";

import { Thought } from "../../../../types/db";

export default {
    reflections: {
        read(reflections, { cache }: FieldFunctionOptions) {
            return reflections;

            return reflections.map((r) => {
                const { thoughtId } = r;
                const thoughtCacheId: string = genCacheId(
                    THOUGHT_TYPENAME,
                    thoughtId
                );

                const thought: Thought = cache.readFragment({
                    id: cache.identify({
                        __typename: THOUGHT_TYPENAME,
                        id: thoughtId,
                    }),
                    fragment: gql`
                        fragment MyThought on Thought {
                            timeId
                            journalId
                            text
                        }
                    `,
                });

                return { ...r, thought: thought };
            });
        },
    },
};
