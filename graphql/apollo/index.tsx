import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

// APOLLO CLIENT

const client = new ApolloClient({
  // TODO Remove hardcode after testing
  uri: "localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

// APOLLO PROVIDER

type ApolloProviderProps = { children: React.ReactNode };
export default (props: ApolloProviderProps) => {
  const { children } = props;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
