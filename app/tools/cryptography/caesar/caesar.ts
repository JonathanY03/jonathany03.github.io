export function caesar(str: string, n: number): string {
    return str.split("").map((char) => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + n % 26 + 26) % 26) + base);
        }
        return char;
    }).join("");
}
