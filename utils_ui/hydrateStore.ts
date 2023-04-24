// HYDRATE APOLLO CLIENT

export const hasInklings = (): boolean => {
    return true;
};
export const hasThoughts = (): boolean => {
    return true;
};
export const mustHydrateApolloClient = (): boolean =>
    !hasInklings() && !hasThoughts();
