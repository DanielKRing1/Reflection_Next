/**
 * Road Map:
 *      START UP
 *
 *      Get Journal Ids
 *      (userId: string) => string[]
 *
 *      -> Request [journal id -> name] map wih userId
 *      -> Send dummy user token (store in global db cache)
 *      -> Store map in Redux
 *      -> Select Journal
 *
 *      INKLING PHASE
 *
 *      Get Inklings
 *      (userId: string, journalId: string) => Inkling[]
 *
 *      -> Request Inklings with userId + journalId
 *      -> Send user token
 *      -> Receive [time id | user id | data]
 *      -> Store in Redux:
 *          JournalInklings reducer:
 *              {
 *                  journalId1: [inklingTimeId11, timeId12, timeId13, ...],
 *                  journalId2: [inklingTimeId21, timeId22, timeId23, ...],
 *                  ...
 *              }
 *          Inklings reducer:
 *              {
 *                  inklingTimeId11: {id, text},
 *                  inklingTimeId12: {id, text},
 *                  ...
 *              }
 *      -> Has Inklings? -> Switch to Reflecting Phase
 *
 *      Commit Inklings
 *      (userId: string, journalId: string) => boolean
 *
 *      -> Send journal id, user token, and Inklings
 *      -> Switch to Reflecting Phase
 *
 *      REFLECTING PHASE
 *
 *      Get Journal Entries
 *      (userId: string, journalId: string, cursorId: string) => JournalEntry[]
 *              => [{ journalEntry time id, { thought time id, text, keep }[] }]
 *
 *      -> Request JournalEntries with userId + journalId
 *      -> Send user token
 *      -> Store in Redux
 *          JournalEntries reducer:
 *              {
 *                  journalId1: [entryTimeId11, timeId12, timeId13, ...],
 *                  journalId2: [entryTimeId21, timeId22, timeId23, ...],
 *                  ...
 *              }
 *          Entries reducer:
 *              {
 *                  entryTimeId11: [{thoughtId111, keep}, ...],
 *                  entryTimeId12: [{thoughtId121, keep}, ...],
 *                  ...
 *              }
 *          Thoughts reducer:
 *              {
 *                  thoughtId111: {id, time, text},
 *                  thoughtId112: {id, time, text},
 *                  ...
 *              }
 *
 *      Get Identity Thoughts
 *      -> Access Redux JournalEntries reducer
 *      -> Get last JournalEntry for active journal id
 *      -> Map Journal Entry Thought ids to Thoughts
 *
 *      Commit Reflection
 *      (userId: string, journalId: string, keepIds: string[], discardIds: string[]) => string[]
 *
 *      -> Send keep ids and discard ids
 *      -> Db saves Inklings as Thoughts
 *      -> Db creates Reflection rows
 *      -> Db creates creates JournalEntry row
 *      -> Db clears Inklings
 *      -> Redux clears Inklings
 *      -> Switch to Inkling Phase
 *
 *
 *      (userId: string) => string[]
 *      (userId: string, journalId: string) => Inkling[]
 *      (userId: string, journalId: string, inklings: Inkling[]) => boolean
 *      (userId: string, journalId: string, cursorId: string) => JournalEntry[]
 *              => [{ journalEntry time id, { thought time id, text, keep }[] }]
 *      (userId: string, journalId: string, keepIds: string[], discardIds: string[]) => string[]
 */

export default {};
