import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";

export default function <T>(
    loading: boolean,
    error: ApolloError,
    data: T,
    onComplete: (data: T) => void,
    onError: (data: T, error: any) => void = () => {}
) {
    const [_data, _setData] = useState(null);

    useEffect(() => {
        if (!loading && !error && _data !== data) {
            onComplete(data);
            _setData(data);
        } else if (!loading && error) onError(data, error);
    }, [loading, error, data, onComplete, onError]);
}
