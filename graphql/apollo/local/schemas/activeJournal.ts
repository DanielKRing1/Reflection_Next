import { getActiveJournal } from "../state/activeJournal";
import { SchemaFragment } from "./types";

const typeDefs = `activeJournal: String`;

export const activeJournalFragment: SchemaFragment = {
    typeDefs,
    fieldPolicies: {
        activeJournal: {
            read() {
                return getActiveJournal();
            },
        },
    },
};
