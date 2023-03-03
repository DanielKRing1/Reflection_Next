const DELIM = "-";

// LOCALSTORAGE KEY GENERATORS

const INKLING_SUFFIX = "INKLINGS";
export const genInklingKey = (journalId: string) =>
  `${journalId}${DELIM}${INKLING_SUFFIX}`;

const THOUGHTSDICT_SUFFIX = "THOUGHTSDICT";
export const genThoughtsDictKey = (journalId: string) =>
  `${journalId}${DELIM}${THOUGHTSDICT_SUFFIX}`;

const JOURNAL_SUFFIX = "JOURNAL";
export const genJournalKey = (journalId: string) =>
  `${journalId}${DELIM}${JOURNAL_SUFFIX}`;

const JOURNAL_IDS_SUFFIX = "JOURNAL_IDS";
export const genJournalIdsKey = () => `${LAST_USED_JOURNAL_SUFFIX}`;

const LAST_USED_JOURNAL_SUFFIX = "LAST_USED_JOURNAL";
export const genLastUsedJournalKey = () =>
  `${DELIM}${LAST_USED_JOURNAL_SUFFIX}`;
