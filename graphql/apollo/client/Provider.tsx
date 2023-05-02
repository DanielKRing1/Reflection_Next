import React from "react";
import { ApolloProvider } from "@apollo/client";

import client from "./client";
import AppPhaseManager from "./AppPhaseManager";

// APOLLO PROVIDER

type ApolloProviderProps = { children: React.ReactNode };
export default (props: ApolloProviderProps) => {
    const { children } = props;

    return (
        <ApolloProvider client={client}>
            <AppPhaseManager>{children}</AppPhaseManager>
        </ApolloProvider>
    );
};
