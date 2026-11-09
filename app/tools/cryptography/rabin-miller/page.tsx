"use client";
import React, {useState} from "react";
import {rabinMiller} from "@/app/tools/cryptography/rabin-miller/rabinMiller";

const Page = () => {
    const [number, setNumber] = useState("");
    const [isPrime, setIsPrime] = useState<boolean | null>(null);

    const handleCheckPrimality = (value: bigint) => {
        if (value <= 0n) {
            setNumber("");
            setIsPrime(null);
            return;
        }
        setNumber(value.toString());
        setIsPrime(rabinMiller(value));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen break-words">
            <div className="w-[80%] p-8">
                <h1 className="text-3xl mb-4 text-center">Rabin-Miller Primality Test</h1>
                <p className="text-center mb-2">Is <input
                    type="number"
                    value={number}
                    onChange={(e) => handleCheckPrimality(BigInt(e.target.value))}
                    placeholder="number"
                    className="text-center border rounded"
                /> prime?</p>
                {isPrime !== null && number !== "0" && (
                    isPrime ? <p className="font-bold text-green-500 text-center"> Yes.</p> : <p className="font-bold text-red-500 text-center"> No.</p>
                )}
            </div>
        </div>
    );
}

export default Page;
