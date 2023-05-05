import { MutationTuple, useMutation } from "@apollo/client";

import {
    getActiveJournal,
    setActiveJournal,
} from "../local/state/activeJournal";
import { setJournalPhaseInklings } from "../local/state/journalPhase";
import { CREATE_JOURNAL, GET_JOURNALS } from "../../gql/journal";
import { Journal } from "../../../db/api/types";

export default (): MutationTuple<any, any, any, any> => {
    /**
     * 1. Create journal on server
     * 2. Add journal locally
     * 3. When journal list changes, select first journal if no active journal
     */

    const [createJournal, handle] = useMutation(CREATE_JOURNAL, {
        update(cache, { data: { createJournal } }) {
            console.log("Create Journal update method:");
            console.log(createJournal);

            const { id, userId, name } = createJournal;
            console.log(id);

            // 1. Add created journal to local cache
            const { journals: existingJournals }: { journals: Journal[] } =
                cache.readQuery({
                    query: GET_JOURNALS,
                });

            cache.writeQuery({
                query: GET_JOURNALS,
                data: {
                    journals: [...existingJournals, { id, userId, name }],
                },
            });

            // TODO: Check if this works -> Did I destructure the response data properly?
            // 2. If no active journal id, set to new journal id
            if (getActiveJournal() === null) setActiveJournal(id);

            // 3. Set JournalPhase to 'Reflection'
            setJournalPhaseInklings();
        },
    });

    return [createJournal, handle];
};