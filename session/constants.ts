const BASE_URL = "http://localhost:4000";

// ACCESS SESSION

export const CREATE_USER_URL = `${BASE_URL}/login/create-user`;
export const LOGIN_URL = `${BASE_URL}/login`;

// REFRESH SESSION

export const REFRESH_URL = `${BASE_URL}/refresh`;

// LOGOUT

export const LOGOUT_URLS = [
    `${BASE_URL}/login/logout`,
    `${BASE_URL}/refresh/logout`,
];
