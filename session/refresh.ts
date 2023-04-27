import axios from "axios";
import { REFRESH_URL } from "./constants";

/**
 *
 * @returns True if refreshed, else false
 */
export const refresh = async () => {
    const res = await axios.post(REFRESH_URL);
    return res.status < 300;
};
