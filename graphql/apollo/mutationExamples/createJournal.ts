import { MutationTuple, useMutation } from "@apollo/client";

import {
    getActiveJournal,
    setActiveJournal,
} from "../local/state/activeJournal";
import { setJournalPhaseInklings } from "../local/state/journalPhase";
import { CREATE_JOURNAL } from "../../gql/journal";

export default (): MutationTuple<any, any, any, any> => {
    const activeJournalId: string = getActiveJournal();

    /**
     * 1. Create journal on server
     * 2. Add journal locally
     * 3. When journal list changes, select first journal if no active journal
     */

    const [commitInklings, handle] = useMutation(CREATE_JOURNAL, {
        variables: {
            journalId: activeJournalId,
        },
        update(
            cache,
            {
                data: {
                    CreateJournal: { id, userId, name },
                },
            }
        ) {
            // 1. If no active journal id, set to new journal id
            if (getActiveJournal() === null) setActiveJournal(id);

            // 2. Set JournalPhase to 'Reflection'
            setJournalPhaseInklings();
        },
    });

    return [commitInklings, handle];
};
