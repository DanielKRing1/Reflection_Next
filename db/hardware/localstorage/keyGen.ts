const DELIM = "-";

// LOCALSTORAGE KEY GENERATORS

// INKLINGS
const INKLING_SUFFIX = "INKLINGS";
export const genInklingKey = (journalId: string) =>
  `${journalId}${DELIM}${INKLING_SUFFIX}`;

// THOUGHTS
const THOUGHTSDICT_SUFFIX = "THOUGHTSDICT";
export const genThoughtsDictKey = (journalId: string) =>
  `${journalId}${DELIM}${THOUGHTSDICT_SUFFIX}`;

// JOURNAL
const JOURNAL_SUFFIX = "JOURNAL";
export const genJournalKey = (journalId: string) =>
  `${journalId}${DELIM}${JOURNAL_SUFFIX}`;

// Journal Metadata
const JOURNAL_METADATA_SUFFIX = "JOURNAL_METADATA";
export const genJournalMetadataKey = (journalId) =>
  `${journalId}${DELIM}${JOURNAL_METADATA_SUFFIX}`;

// Journal Ids
const JOURNAL_IDS_SUFFIX = "JOURNAL_IDS";
export const genJournalIdsKey = () => `${JOURNAL_IDS_SUFFIX}`;

const LAST_USED_JOURNAL_SUFFIX = "LAST_USED_JOURNAL";
export const genLastUsedJournalKey = () => `${LAST_USED_JOURNAL_SUFFIX}`;
