"use client";
import "@/app/globals.css";
import React from "react";
import Link from 'next/link'

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1 className="text-2xl font-bold mb-4 text-center">Welcome</h1>
                <p className="text-gray-700 mb-2">Hi. This is my first blog post! I don't know what else to write.</p>
                <p className="text-gray-700 mb-2">As of writing:</p>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                    <li>I'm a Master's student at the University of Guelph studying Cybersecurity and Threat Intelligence.</li>
                    <li>I've completed my bachelor degree at the University of Toronto in Information Security (specialist) and Mathematical Sciences (minor).</li>
                    <li>I enjoy coding, cybersecurity, and learning about new technologies.</li>
                </ul>
                <p className="text-gray-700 mb-2">I'll add more blog entries if I remember.</p>
                <div className="flex flex-col items-center justify-center">
                    <Link href="/blog" className="hover:underline">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
