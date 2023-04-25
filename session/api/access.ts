import axios from "axios";

import cache from "../credentialsCache";

import { CREATE_USER_URL, LOGIN_URL } from "./constants";

export const createUser = (userId: string, password: string) => {
    return startSession(CREATE_USER_URL, userId, password);
};

export const login = (userId: string, password: string) => {
    return startSession(LOGIN_URL, userId, password);
};

/**
 * Reusable method for caching user credentials locally and then logging in or creating a new user
 *
 * @param url Login or Create User url
 * @param userId
 * @param password
 * @returns axios post response
 */
const startSession = (url: string, userId: string, password: string) => {
    cache.setCredentials(userId, password);

    return axios.post(url, {
        userId,
        password,
    });
};
