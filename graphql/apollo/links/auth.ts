import { setContext } from "@apollo/client/link/context";

import store from "../../../redux/store";

import {
    NeededSessionAction,
    getNeededSessionAction,
    isAccessCookieGettingStale,
    isRefreshCookieGettingStale,
} from "../../../utils_ui/session";
import { refresh } from "../../../session/refresh";

export default setContext(async (request, prevContext) => {
    switch (getNeededSessionAction()) {
        case NeededSessionAction.None: {
            // 1. Do nothing
            if (!isAccessCookieGettingStale()) return {};

            // 2. Else Access Cookie is getting stale, so
            // continue to Refresh block
        }
        case NeededSessionAction.Refresh: {
            // 1. Refresh
            // This will refresh the Access Cookie on the browser
            // And
            // Refresh the Refresh Cookie from the server (if it is > half expired)
            if (!isRefreshCookieGettingStale()) {
                await refresh();
                return {};
            }

            // 2. Refresh Cookie will expire before session can be refreshed, so
            // continue to Login block
        }

        default:
        case NeededSessionAction.Login:
        case NeededSessionAction.ReLogin: {
            // 1. Update Redux store to no longer be logged in
            // store.dispatch();
            return {};
        }
    }
});
