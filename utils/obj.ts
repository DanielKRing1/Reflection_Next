import { Dict } from "../types/data";

export function arrayToObj<T>(arr: T[], getKey: (a: T) => string | number) {
    return arr.reduce((acc: Dict<T>, cur: T) => {
        acc[getKey(cur)] = cur;

        return acc;
    }, {});
}
