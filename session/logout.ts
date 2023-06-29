import axios from "axios";
import { LOGOUT_URL } from "./constants";
import { logoutLocal } from "../graphql/apollo/local/state/isLoggedIn";

export const logout = async () => {
    const res = await axios.post(
        LOGOUT_URL,
        {},
        {
            // NECESSARY TO SAVE COOKIES TO BROWSER
            //AxiosRequestConfig parameter
            withCredentials: true, //correct
        }
    );
    const success = res.status < 300;
    if (success) logoutLocal();

    return success;
};
