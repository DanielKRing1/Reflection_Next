import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";

import authLink from "../links/auth";
import errorLink from "../links/onError";
import localState from "../local/schemas";

import jeCacheFieldPolicy from "./fieldPolicy/journalEntryRead";
import jeQueryFieldPolicy from "./fieldPolicy/journalEntryMerge";
import thoughtFieldPolicy from "./fieldPolicy/thoughtMerge";
import inklingFieldPolicy from "./fieldPolicy/inklingMerge";

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
            // ...jeCacheFieldPolicy,
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
            ...thoughtFieldPolicy,
            ...inklingFieldPolicy,
        },
    },
};

// ERROR HANDLER

// [operation, authLink, errorLink]

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_URL,
    credentials: "include",
});

// APOLLO CLIENT

const client = new ApolloClient({
    // TODO Remove hardcode after testing
    uri: process.env.NEXT_PUBLIC_GQL_URL,
    // credentials: "include",
    cache: new InMemoryCache({
        // @ts-ignore
        typePolicies,
    }),
    link: from([errorLink, authLink, httpLink]),

    // Local schema types
    typeDefs: localState.typeDefs,

    connectToDevTools: true,
});

export default client;
