"use client";
import Link from "next/link";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen break-words">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1>Projects</h1>
                <ul>
                    <li> - <Link href="/projects/connect-4" className="hover:underline">Connect 4</Link></li>
                    <li> - <Link href="/projects/password-demo" className="hover:underline">Password Demo</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Page;
