"use client";
import Link from "next/link";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-[80%] p-8">
                <h1 className="text-3xl mb-4 text-center">Tools</h1>
                <h2 className="text-2xl mb-2">Cryptography</h2>
                <Link href="/tools/cryptography/fast-exponentiation" className="hover:underline"><h3 className="text-xl mb-2">Fast Exponentiation</h3></Link>
                <p className="mb-2">Modular exponentiaion. Uses the fast modular exponentiation algorithm.</p>
                <Link href="/tools/cryptography/rabin-miller" className="hover:underline"><h3 className="text-xl mb-2">Rabin-Miller</h3></Link>
                <p className="mb-2">Rabin-Miller primality test. Performs 100 rounds.</p>
                <Link href="/tools/cryptography/caesar" className="hover:underline"><h3 className="text-xl mb-2">Caesar Cipher</h3></Link>
                <p className="mb-2">Encoder and decoder for the Caesar substitution cipher.</p>
            </div>
        </div>
    );
}

export default Page;
