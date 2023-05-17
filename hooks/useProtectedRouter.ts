import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";

import { journalPhaseVar } from "../graphql/apollo/local/state/journalPhase";
import { JournalPhase } from "../utils_ui/journalPhase";
import { CREATE_JOURNAL_PATH } from "../routing/paths";

export default () => {
    // ROUTER
    const router = useRouter();

    // LOCAL GQL
    const journalPhase = useReactiveVar(journalPhaseVar);

    // PROTECTED ROUTER METHODS
    const protectedPush = (path: string) => {
        if (
            journalPhase === JournalPhase.CreateJournal &&
            router.pathname === CREATE_JOURNAL_PATH
        )
            return;

        router.push(path);
    };

    return {
        ...router,
        push: protectedPush,
    };
};
