import { fastExp } from "@/app/tools/cryptography/fast-exponentiation/fastExp";

export function rabinMiller(n: bigint, iters: number = 100): boolean {
    if (n <= 1n) return false;
    if (n == 2n || n == 3n) return true;
    if (n % 2n == 0n) return false;
    let m = n - 1n;
    let k = 0;
    while (m % 2n == 0n) {
        m /= 2n;
        k += 1;
    }
    for (let i = 0; i < iters; i++) {
        const a = Math.floor(Math.random() * Number(n - 3n)) + 2;
        let x = fastExp(BigInt(a), m, n);
        for (let j = 0; j < k; j++) {
            let y = fastExp(x, 2n, n);
            if (y == 1n && x != 1n && x != n - 1n) return false;
            x = y;
        }
        if (x != 1n) return false;
    }
    return true;
}