import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";

import authLink from "../links/auth";
import localState from "../local/schemas";

import jeCacheFieldPolicy from "./fieldPolicy/journalEntryRead";
import jeQueryFieldPolicy from "./fieldPolicy/journalEntryMerge";

// TYPE POLICIES
// (Define id fields)

const typePolicies = {
    Inkling: {
        keyFields: ["timeId"],
    },
    JournalEntry: {
        keyFields: ["timeId"],

        // Combine Thought into Reflection
        fields: {
            ...jeCacheFieldPolicy,
        },
    },
    Thought: {
        keyFields: ["timeId"],
    },

    // Local schema types
    Query: {
        fields: {
            ...localState.fieldPolicies,
            ...jeQueryFieldPolicy,
        },
    },
};

// ERROR HANDLER

// [operation, authLink, errorLink]

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});

// APOLLO CLIENT

const client = new ApolloClient({
    // TODO Remove hardcode after testing
    uri: "http://localhost:4000/graphql",
    // credentials: "include",
    cache: new InMemoryCache({
        // @ts-ignore
        typePolicies,
    }),
    link: from([authLink, httpLink]),

    // Local schema types
    typeDefs: localState.typeDefs,

    connectToDevTools: true,
});

export default client;
