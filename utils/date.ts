/**
 *
 * @param a Date a
 * @param b Date b
 * @returns true if data a is older than date b, else false
 */
export const isDateOlder = (a: Date, b: Date) => a.getTime() < b.getTime();

export const getDay = (d: Date = new Date()) => d.getUTCDay();
export const getDate = (d: Date = new Date()) => d.getUTCDate();
export const getMonth = (d: Date = new Date()) => d.getUTCMonth();
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const getMonthName = (d: Date = new Date()) => monthNames[getMonth(d)];
export const getYear = (d: Date = new Date()) => d.getUTCFullYear();
