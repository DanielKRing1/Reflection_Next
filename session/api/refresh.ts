import axios from "axios";
import { REFRESH_URL } from "./constants";

export const refresh = () => {
    return axios.post(REFRESH_URL);
};
