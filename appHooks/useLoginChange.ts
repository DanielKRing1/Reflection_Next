/**
 * Only use this hook once at the top-level of the app
 */

import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import useProtectedRouter from "../hooks/useProtectedRouter";
import { LOGIN_PATH } from "../routing/paths";
import { goBackOrHome } from "../utils/routing";

import { GET_IS_LOGGED_IN } from "../graphql/apollo/local/gql/isLoggedIn";
import { keepSessionFresh } from "../graphql/apollo/local/state/isLoggedIn";

export default () => {
    // Local state query
    const { data } = useQuery(GET_IS_LOGGED_IN);

    // Routing
    const router = useProtectedRouter();

    // Try to login the first time the app loads
    useEffect(() => {
        keepSessionFresh();
    }, []);

    // Redirect pages when isLoggedIn changes
    useEffect(() => {
        if (!data.isLoggedIn) router.push(LOGIN_PATH);
        else if (router.pathname === LOGIN_PATH) goBackOrHome(router);
    }, [data.isLoggedIn]);
};
