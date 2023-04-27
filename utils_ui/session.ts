import { parseJSONCookie } from "../utils/cookie";
import { isDateOlder } from "../utils/date";

const META_ACCESS_SESSION_COOKIE_NAME = "rfltn-access-meta";
const META_REFRESH_SESSION_COOKIE_NAME = "rfltn-refresh-meta";

// LOGIN

export enum NeededSessionAction {
    Login,
    ReLogin,
    Refresh,
    None,
}

// ACCESS

/**
 *
 * @param staleTtl The remaining lifespan of the access cookie in ms, that would make it considered 'getting stale'
 * default is 30 min (1000*60*30)
 * @returns
 */
export const isAccessCookieGettingStale = (
    staleTtl: number = 1000 * 60 * 30
): boolean => {
    try {
        const { expires } = parseJSONCookie(META_ACCESS_SESSION_COOKIE_NAME);
        if (expires === undefined)
            throw new Error(
                "isAccessCookieGettingStale did not find an access meta cookie"
            );

        // Stale (return false) if ttl from now is <= staleTtl
        return (expires as Date).getTime() - Date.now() <= staleTtl;
    } catch (err) {
        console.log(err);
        return true;
    }
};

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
                "hasFreshAccessCookie did not find an access meta cookie"
            );

        // Fresh (return true) if now is 'older' than expiration
        return isDateOlder(new Date(), expires as Date);
    } catch (err) {
        console.log(err);
        return false;
    }
};

// REFRESH

/**
 *
 * @param staleTtl The remaining lifespan of the access cookie in ms, that would make it considered 'getting stale'
 * default is 10 seconds (1000*10)
 * My idea is that if the refresh cookie will expire within the next 10 seconds, there 'is not enough time' (maybe) to renew the refresh token
 * @returns
 */
export const isRefreshCookieGettingStale = (
    staleTtl: number = 1000 * 10
): boolean => {
    try {
        const { expires } = parseJSONCookie(META_REFRESH_SESSION_COOKIE_NAME);
        if (expires === undefined)
            throw new Error(
                "isRefreshCookieGettingStale did not find a refresh meta cookie"
            );

        // Stale (return false) if ttl from now is <= staleTtl
        return (expires as Date).getTime() - Date.now() <= staleTtl;
    } catch (err) {
        console.log(err);
        return true;
    }
};

/**
 * Server already regenerates refresh cookie when > half expired, so no refresh logic needed
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
