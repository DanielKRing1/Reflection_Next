export const padStart = (text: string, totalLength: number, char: string) =>
    text.length >= totalLength ? text : text.padStart(totalLength, char);
export const padEnd = (text: string, totalLength: number, char: string) =>
    text.length >= totalLength ? text : text.padEnd(totalLength, char);
