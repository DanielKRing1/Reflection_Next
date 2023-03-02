const DELIM = "_";

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
