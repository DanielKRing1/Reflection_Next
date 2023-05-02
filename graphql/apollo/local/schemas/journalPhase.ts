import { getJournalPhase } from "../state/journalPhase";
import { SchemaFragment } from "./types";

const typeDefs = `journalPhase: Int`;

export const journalPhaseFragment: SchemaFragment = {
    typeDefs,
    fieldPolicies: {
        journalPhase: {
            read() {
                return getJournalPhase();
            },
        },
    },
};
