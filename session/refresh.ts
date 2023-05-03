import axios from "axios";
import { REFRESH_URL } from "./constants";

/**
 *
 * @returns True if refreshed, else false
 */
export const refresh = async () => {
    const res = await axios.post(
        REFRESH_URL,
        {},
        {
            // NECESSARY TO SAVE COOKIES TO BROWSER
            //AxiosRequestConfig parameter
            withCredentials: true, //correct
        }
    );
    return res.status < 300;
};
