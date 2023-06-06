import React from "react";
import { ApolloProvider } from "@apollo/client";

import client from "./client";
import AppStateManager from "./AppStateManager";

// APOLLO PROVIDER

type ApolloProviderProps = { children: React.ReactNode };
export default (props: ApolloProviderProps) => {
    const { children } = props;

    return (
        <ApolloProvider client={client}>
            <AppStateManager>{children}</AppStateManager>
        </ApolloProvider>
    );
};
