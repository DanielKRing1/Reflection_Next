import { ApolloClient, InMemoryCache } from "@apollo/client";

// APOLLO CLIENT

const client = new ApolloClient({
    // TODO Remove hardcode after testing
    uri: "localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

export default client;
