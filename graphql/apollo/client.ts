import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";

import authLink from "./links/auth";

// TYPE POLICIES
// (Define id fields)

const typePolicies = {
    Inkling: {
        keyFields: ["timeId"],
    },
    JournalEntry: {
        keyFields: ["timeId"],
    },
    Thought: {
        keyFields: ["timeId"],
    },
};

// ERROR HANDLER

// [operation, authLink, errorLink]

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

// APOLLO CLIENT

const client = new ApolloClient({
    // TODO Remove hardcode after testing
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache({
        typePolicies,
    }),
    link: from([authLink, httpLink]),
});

export default client;
