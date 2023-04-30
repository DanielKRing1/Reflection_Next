import React from "react";
import { ApolloProvider } from "@apollo/client";

import client from "./client";

// APOLLO PROVIDER

type ApolloProviderProps = { children: React.ReactNode };
export default (props: ApolloProviderProps) => {
    const { children } = props;

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
