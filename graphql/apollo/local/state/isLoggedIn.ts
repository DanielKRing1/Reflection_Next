import { makeVar } from "@apollo/client";

import {
    NeededSessionAction,
    isAccessCookieGettingStale,
    isRefreshCookieGettingStale,
} from "../../../../utils_ui/session";
import { getNeededSessionAction } from "../../../../utils_ui/session";
import { refresh } from "../../../../session/refresh";
import { clearActiveJournal } from "./activeJournal";
import client from "../../client/client";

// Initializes to true if has fresh access and refresh cookies
export const isLoggedInVar = makeVar<boolean>(
    getNeededSessionAction() === NeededSessionAction.None
);

export const getIsLoggedIn = () => isLoggedInVar();
export const loginLocal = () => isLoggedInVar(true);
export const logoutLocal = () => {
    isLoggedInVar(false);
    clearActiveJournal();
    // Clear journal
    client.clearStore();
};

export const keepSessionFresh = async () => {
    switch (getNeededSessionAction()) {
        case NeededSessionAction.None: {
            // 1. Do nothing
            if (!isAccessCookieGettingStale()) loginLocal();

            // 2. Else Access Cookie is getting stale, so
            // continue to Refresh block
        }
        case NeededSessionAction.Refresh: {
            // 1. Refresh
            // This will refresh the Access Cookie on the browser
            // And
            // Refresh the Refresh Cookie from the server (if it is > half expired)
            if (!isRefreshCookieGettingStale()) {
                const refreshed = await refresh();
                if (refreshed) {
                    loginLocal();
                    break;
                }
            }

            // 2. Refresh Cookie will expire before session can be refreshed, so
            // continue to Login block
        }

        default:
        case NeededSessionAction.Login:
        case NeededSessionAction.ReLogin: {
            // 1. Update local store to no longer be logged in
            logoutLocal();
            break;
        }
    }
};
