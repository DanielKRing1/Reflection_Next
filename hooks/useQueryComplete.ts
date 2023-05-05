import { ApolloError } from "@apollo/client";
import { useEffect } from "react";

export default function <T>(
    loading: boolean,
    error: ApolloError,
    data: T,
    onComplete: (data: T) => void,
    onError: (data: T, error: any) => void = () => {}
) {
    useEffect(() => {
        if (!loading && !error) onComplete(data);
        else if (!loading && error) onError(data, error);
    }, [loading, error, data, onComplete, onError]);
}
