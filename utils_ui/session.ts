import { parseJSONCookie } from "../utils/cookie";
import { isDateOlder } from "../utils/date";

const META_ACCESS_SESSION_COOKIE_NAME = "rfltn-access-meta";
const META_REFRESH_SESSION_COOKIE_NAME = "rfltn-refresh-meta";

// LOGIN

export enum NeededSessionAction {
    Login,
    Refresh,
    None,
}

/**
 *
 * @returns Whether access session cookie has expired, based on access session meta cookie's 'expires' attribute
 * If no cookie present or no 'expires' attribute, returns false
 */
export const hasFreshAccessCookie = (): boolean => {
    try {
        const { expires } = parseJSONCookie(META_ACCESS_SESSION_COOKIE_NAME);
        if (expires === undefined)
            throw new Error(
                "hasFreshAccessCookie did not find a access meta cookie"
            );

        // Fresh (return true) if now is 'older' than expiration
        return isDateOlder(new Date(), expires as Date);
    } catch (err) {
        console.log(err);
        return false;
    }
};
/**
 *
 * @returns Whether refresh session cookie has expired, based on refresh session meta cookie's 'expires' attribute
 * If no cookie present or no 'expires' attribute, returns false
 */
export const hasFreshRefreshCookie = (): boolean => {
    try {
        const { expires } = parseJSONCookie(META_REFRESH_SESSION_COOKIE_NAME);
        if (expires === undefined)
            throw new Error(
                "hasFreshRefreshCookie did not find a refresh meta cookie"
            );

        // Fresh (return true) if now is 'older' than expiration
        return isDateOlder(new Date(), expires as Date);
    } catch (err) {
        console.log(err);
        return false;
    }
};
export const getNeededSessionAction = (): NeededSessionAction => {
    if (hasFreshAccessCookie()) return NeededSessionAction.None;
    if (hasFreshRefreshCookie()) return NeededSessionAction.Refresh;
    return NeededSessionAction.Login;
};
