import { JournalMetadata } from "../../../db/api/types";

export const getJournalName = (metadata: JournalMetadata): string | undefined =>
  metadata.name;
