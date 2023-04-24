/**
 *
 * @param a Date a
 * @param b Date b
 * @returns true if data a is older than date b, else false
 */
export const isDateOlder = (a: Date, b: Date) => a.getTime() < b.getTime();
