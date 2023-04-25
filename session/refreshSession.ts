import { login } from "./api/access";
import { refresh } from "./api/refresh";

import credentialsCache from "./credentialsCache";

import {
    NeededSessionAction,
    getNeededSessionAction,
} from "../utils_ui/session";

/**
 * This method tries to refresh the user's session
 * @param neededAction Optionally set the needed action to take
 */
export default async (neededAction: NeededSessionAction = undefined) => {
    const sessionAction = neededAction || getNeededSessionAction();

    switch (sessionAction) {
        case NeededSessionAction.Login: {
            if (!credentialsCache.isEmpty())
                await login(credentialsCache.userId, credentialsCache.password);
            break;
        }
        case NeededSessionAction.Refresh: {
            await refresh();
            break;
        }
        default:
        case NeededSessionAction.None: {
            // Maybe session was expired, server-side
            console.log("Should have fresh access cookie");

            if (!credentialsCache.isEmpty())
                await login(credentialsCache.userId, credentialsCache.password);
            break;
        }
    }
};
