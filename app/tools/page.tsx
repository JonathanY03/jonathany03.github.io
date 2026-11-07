"use client";
import Link from "next/link";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen break-words">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1>Cryptography</h1>
                <ul>
                    <li> - <Link href="/tools/cryptography/rabin-miller" className="hover:underline">Rabin-Miller Primality Test</Link></li>
                    <li> - <Link href="/tools/cryptography/fast-exponentiation" className="hover:underline">Fast Exponentiation</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Page;
