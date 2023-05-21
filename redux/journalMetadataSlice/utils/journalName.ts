import { JournalMetadata } from "../../../types/db";

export const getJournalName = (metadata: JournalMetadata): string | undefined =>
    metadata.name;
