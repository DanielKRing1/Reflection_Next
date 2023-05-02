/**
 * Only use this hook once at the top-level of the app
 */

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GET_IS_LOGGED_IN } from "../graphql/apollo/local/gql/isLoggedIn";

export default () => {
    // Local state query
    const { data: isLoggedIn } = useQuery<boolean>(GET_IS_LOGGED_IN);

    // Routing
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) router.push("/login");
        else router.push("/");
    }, [isLoggedIn]);
};
