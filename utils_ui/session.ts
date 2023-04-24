// LOGIN

export enum NeededLoginAction {
    Login,
    Refresh,
    None,
}

export const hasFreshAccessCookie = (): boolean => {
    return true;
};
export const hasFreshRefreshCookie = (): boolean => {
    return true;
};
export const getNeededLoginAction = (): NeededLoginAction => {
    if (hasFreshAccessCookie()) return NeededLoginAction.None;
    if (hasFreshRefreshCookie()) return NeededLoginAction.Refresh;
    return NeededLoginAction.Login;
};
