/**
 * This component:
 *
 *      1. Redirects the user to the: login page on logout + '/' on login
 *      2. Hydrates the Apollo client with user-specific data on load
 *      3. Hydrates the Apollo client with journal-specific data on journal change
 *      4. Update local Journal Phase on journal change (once server-side Inklings are cached locally)
 *           + Redirects the user to the appropriate page for the current Journal Phase
 */

// TOP-LEVEL HOOKS

import useHydrateApp from "../../../appHooks/useHydrateApp";
import useHydrateJournal from "../../../appHooks/useHydrateJournal";
import useJournalPhase from "../../../appHooks/useJournalPhase";
import useLoginChange from "../../../appHooks/useLoginChange";
import useSyncActiveJournal from "../../../appHooks/useSyncActiveJournal";

type AppStateManagerProps = { children: React.ReactNode };
export default ({ children }: AppStateManagerProps) => {
    useLoginChange();
    useHydrateApp();
    useHydrateJournal();
    useJournalPhase();
    useSyncActiveJournal();

    return <>{children}</>;
};
