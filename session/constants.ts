const BASE_URL = process.env.NEXT_PUBLIC_SESSION_BASE_URL;

// ACCESS SESSION

console.log(BASE_URL);

export const CREATE_USER_URL = `${BASE_URL}/login/create-user`;
export const LOGIN_URL = `${BASE_URL}/login`;

// REFRESH SESSION

export const REFRESH_URL = `${BASE_URL}/refresh`;

// LOGOUT

export const LOGOUT_URLS = [
    `${BASE_URL}/login/logout`,
    `${BASE_URL}/refresh/logout`,
];
