"use client";
import React, {useState, useEffect} from "react";
import {fastExp} from "@/app/tools/cryptography/fast-exponentiation/fastExp";

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
        <div className="flex flex-col items-center justify-center min-h-screen break-words">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1>Fast Exponentiation</h1>
                <p>a^b mod n = {result === null ? "?" : (<span>{result.toString()}</span>)}</p>
                <p>Input values:</p>
                <p>a = <input
                    type="text"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    placeholder="base"
                    className="text-center border rounded"
                /></p>
                <p>b = <input
                    type="text"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    placeholder="exponent"
                    className="text-center border rounded"
                /></p>
                <p>n = <input
                    type="text"
                    value={mod}
                    onChange={(e) => setMod(e.target.value)}
                    placeholder="modulus"
                    className="text-center border rounded"
                /></p>
            </div>
        </div>
    );
}

export default Page;
