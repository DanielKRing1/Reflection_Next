/**
 * Only use this hook once at the top-level of the app
 */

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GET_IS_LOGGED_IN } from "../graphql/apollo/local/gql/isLoggedIn";
import { keepSessionFresh } from "../graphql/apollo/local/state/isLoggedIn";

export default () => {
    // Local state query
    const { data } = useQuery(GET_IS_LOGGED_IN);

    // Routing
    const router = useRouter();

    // Try to login the first time the app loads
    useEffect(() => {
        keepSessionFresh();
    }, []);

    // Redirect pages when isLoggedIn changes
    useEffect(() => {
        if (!data.isLoggedIn) router.push("/login");
        else if (router.pathname === "/login") router.push("/");
    }, [data.isLoggedIn]);
};
