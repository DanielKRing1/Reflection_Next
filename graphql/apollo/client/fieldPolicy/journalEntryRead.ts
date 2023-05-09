import { FieldFunctionOptions, gql } from "@apollo/client";

import { genCacheId } from "../../local/utils/id";
import { THOUGHT_TYPENAME } from "../../server/typenames";

import { Thought } from "../../../../db/api/types";

export default {
    reflections: {
        read(reflections, { cache }: FieldFunctionOptions) {
            return reflections.map((r) => {
                const { thoughtId } = r;
                const thoughtCacheId: string = genCacheId(
                    THOUGHT_TYPENAME,
                    thoughtId
                );

                const thought: Thought = cache.readFragment({
                    id: thoughtCacheId,
                    fragment: gql`
                        fragment MyThought on Thought {
                            timeId
                            journalId
                            text
                        }
                    `,
                });

                return { ...r, thought };
            });
        },
    },
};
