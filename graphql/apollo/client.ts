import { ApolloClient, InMemoryCache } from "@apollo/client";

// TYPW POLICIES

const typePolicies = {
    Inkling: {
        keyFields: ["upc"],
    },
    JournalEntry: {
        keyFields: ["upc"],
    },
    Thought: {
        keyFields: ["upc"],
    },
};

// APOLLO CLIENT

const client = new ApolloClient({
    // TODO Remove hardcode after testing
    uri: "localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache({
        typePolicies,
    }),
});

export default client;
