"use client";
import "@/app/globals.css";
import React, {useState} from "react";
import {fastExp} from "../fast-exponentiation/page";

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

const Page = () => {
    const [number, setNumber] = useState("");
    const [isPrime, setIsPrime] = useState<boolean | null>(null);

    const handleCheckPrimality = (value: string) => {
        if (!/^\d*$/.test(value)) {
            setNumber("");
            setIsPrime(null);
            return;
        }
        const num = BigInt(value);
        if (num < 0n) {
            setNumber("");
            setIsPrime(null);
            return;
        }
        setNumber(num.toString());
        setIsPrime(rabinMiller(num));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Rabin-Miller Primality Test</h1>
            <input
                type="text"
                value={number == "0" ? "" : number}
                onChange={(e) => handleCheckPrimality(e.target.value)}
                placeholder="Enter a number"
                className="border p-2 mb-4 rounded"
            />
            {isPrime !== null && number !== "0" && (
                <p className="mt-4">
                    {number} is {isPrime ? <span className="font-bold text-green-500">prime</span> : <span className="font-bold text-red-500">NOT prime</span>}.
                </p>
            )}
        </div>
    );
}

export default Page;
