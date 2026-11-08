"use client";
import React, {useState, useEffect} from "react";
import {caesar} from "@/app/tools/cryptography/caesar/caesar";

const Page = () => {
    const [p, setP] = useState("");
    const [c, setC] = useState("");
    const [shift, setShift] = useState(0);
    const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

    const handleSetShift = (value: number) => {
        if (isNaN(value)) setShift(0);
        else setShift(value);
    };

    const handleSetP = (value: string) => {
        setP(value);
        setMode("encrypt");
    };
    const handleSetC = (value: string) => {
        setC(value);
        setMode("decrypt");
    };

    useEffect(() => {
        if (mode === "encrypt") setC(caesar(p, shift));
        else setP(caesar(c, -shift));
    }, [p, c, shift]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen break-words">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1>Caesar Cipher</h1>
                <div className="grid grid-cols-[80px_1fr]">
                    <p>Shift:</p><input
                        type="number"
                        value={shift}
                        onChange={(e) => handleSetShift(parseInt(e.target.value))}
                        placeholder="shift"
                        className="border rounded px-2"
                    />
                    <p>Plaintext:</p><textarea
                        value={p}
                        onChange={(e) => handleSetP(e.target.value)}
                        placeholder="plaintext"
                        className="w-full min-h-32 overflow-y-auto break-words border rounded-md px-2"
                    />
                    <p>Ciphertext:</p><textarea
                        value={c}
                        onChange={(e) => handleSetC(e.target.value)}
                        placeholder="ciphertext"
                        className="w-full min-h-32 overflow-y-auto break-words border rounded-md px-2"
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
