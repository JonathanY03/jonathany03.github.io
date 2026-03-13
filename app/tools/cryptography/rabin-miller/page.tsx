"use client";
import "@/app/globals.css";
import React, {useState} from "react";
import {rabinMiller} from "@/app/tools/cryptography/rabin-miller/rabinMiller";

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
