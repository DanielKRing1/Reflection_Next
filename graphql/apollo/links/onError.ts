// THIS WAS COPY/PASTED FROM DOCS

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach((error) =>
            console.log(
                `[GraphQL error]: Message: ${
                    error.message
                }, Location: ${JSON.stringify(error.locations)}, Path: ${
                    error.path
                },\nFull error: ${JSON.stringify(error)}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export default errorLink;
