import Cookies from "js-cookie";

/**
 * Parse a cookie with a json payload into a js object
 *
 * @param cookieName
 * @returns Cookie json value as a js object if exists, else empty object
 */
export const parseJSONCookie = (cookieName: string) => {
    try {
        const cookie = Cookies.get(cookieName);

        return JSON.parse(cookie);
    } catch (err) {
        console.log(err);
        return {};
    }
};
