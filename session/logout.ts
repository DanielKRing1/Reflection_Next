import axios from "axios";
import { LOGOUT_URLS } from "./constants";
import { logoutLocal } from "../graphql/apollo/local/state/isLoggedIn";

export const logout = async () => {
    let res;
    let success = true;

    for (let url of LOGOUT_URLS) {
        res = await axios.post(url);
        success = success && res.status < 300;
    }

    if (success) logoutLocal();

    return success;
};
