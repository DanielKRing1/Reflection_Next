import axios from "axios";

import { CREATE_USER_URL, LOGIN_URL } from "./constants";

/**
 *
 * @param userId
 * @param password
 * @returns True if created user, else false
 */
export const createUser = async (userId: string, password: string) => {
    const res = await startSession(CREATE_USER_URL, userId, password);
    return res.status < 300;
};

/**
 *
 * @param userId
 * @param password
 * @returns True if logged in user, else false
 */
export const login = async (userId: string, password: string) => {
    const res = await startSession(LOGIN_URL, userId, password);
    return res.status < 300;
};

/**
 * Reusable method for caching user credentials locally and then logging in or creating a new user
 *
 * @param url Login or Create User url
 * @param userId
 * @param password
 * @returns axios post response
 */
const startSession = async (url: string, userId: string, password: string) => {
    return axios.post(url, {
        userId,
        password,
    });
};
