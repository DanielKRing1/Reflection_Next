import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";

import { journalPhaseVar } from "../graphql/apollo/local/state/journalPhase";
import { JournalPhase } from "../utils_ui/journalPhase";
import { CREATE_JOURNAL_PATH } from "../routing/paths";

interface TransitionOptions {
    shallow?: boolean; // 浅いルーティングにするか (デフォは false)
    locale?: string | false; // 新しいページのロケール設定
    scroll?: boolean; // 遷移後に先頭にスクロールするか (デフォはtrue)
}

export default () => {
    // ROUTER
    const router = useRouter();

    // LOCAL GQL
    const journalPhase = useReactiveVar(journalPhaseVar);

    // PROTECTED ROUTER METHODS
    const protectedPush = (
        url: Url,
        as?: Url,
        options?: TransitionOptions
    ): Promise<boolean> => {
        if (
            journalPhase === JournalPhase.CreateJournal &&
            router.pathname === CREATE_JOURNAL_PATH
        )
            return;

        return router.push(url, as, options);
    };

    return {
        ...router,
        push: protectedPush,
    };
};
