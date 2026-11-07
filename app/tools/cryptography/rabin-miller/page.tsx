"use client";
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
        <div className="flex flex-col items-center justify-center min-h-screen break-words">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1>Rabin-Miller Primality Test</h1>
                Is <input
                    type="text"
                    value={number == "0" ? "" : number}
                    onChange={(e) => handleCheckPrimality(e.target.value)}
                    placeholder="input number here"
                    className="text-center border rounded"
                /> prime? 
                {isPrime !== null && number !== "0" && (
                    isPrime ? <span className="font-bold text-green-500"> Yes.</span> : <span className="font-bold text-red-500"> No.</span>
                )}
            </div>
        </div>
    );
}

export default Page;
