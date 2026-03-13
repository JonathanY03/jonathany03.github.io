"use client";
import "@/app/globals.css";
import React, {useState, useEffect} from "react";

export function fastExp(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        exp = exp / 2n;
        base = (base * base) % mod;
    }
    return result;
}

const Page = () => {
    const [base, setBase] = useState("");
    const [exp, setExp] = useState("");
    const [mod, setMod] = useState("");
    const [result, setResult] = useState<bigint | null>(null);

    const handleCalculate = () => {
        if (!/^\d*$/.test(base) || !/^\d*$/.test(exp) || !/^\d*$/.test(mod)) {
            setBase("");
            setExp("");
            setMod("");
            setResult(null);
            return;
        }
        const b = BigInt(base);
        const e = BigInt(exp);
        const m = BigInt(mod);

        if (m === 0n) {
            setBase("");
            setExp("");
            setMod("");
            setResult(null);
            return;
        }
        setResult(fastExp(b, e, m));
    };

    useEffect(() => {
        if (base === "" || exp === "" || mod === "") {
            setResult(null);
            return;
        }
        handleCalculate();
    }, [base, exp, mod]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Fast Exponentiation</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <label className="mb-2">Base:</label>
                    <input
                        type="text"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="Base"
                        className="border p-2 mb-4 rounded"
                    /> 
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Exponent:</label>
                    <input
                        type="text"
                        value={exp}
                        onChange={(e) => setExp(e.target.value)}
                        placeholder="Exponent"
                        className="border p-2 mb-4 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Modulus:</label>
                    <input
                        type="text"
                        value={mod}
                        onChange={(e) => setMod(e.target.value)}
                        placeholder="Modulus"
                        className="border p-2 mb-4 rounded"
                    />
                </div>
            </div>
            {result !== null && (
                <p className="mt-4">
                    Result: <span className="font-bold">{result.toString()}</span>
                </p>
            )}
        </div>
    );
}

export default Page;
