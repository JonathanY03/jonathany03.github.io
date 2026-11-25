"use client";

import { LINKS } from "@/constants/links";

const Page = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-[80%]">
                <div className="mb-8 border-b pb-8">
                    <h3 className="text-xl mb-2">Cybersecurity | Threat Intelligence | Security Operations</h3>
                    <h1 className="text-3xl mb-4">Hi, I'm Jonathan Yu</h1>
                    <p className="mb-2">I focus on security operations, threat detection, and threat intelligence, with a background in cybersecurity and information security.</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <a href={LINKS.linkedin} target="blank" className="rounded-full border p-4 hover:underline">Connect on LinkedIn</a>
                        <a href={LINKS.github} target="blank" className="rounded-full border p-4 hover:underline">View GitHub</a>
                    </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                        <h2 className="text-2xl mb-2">About Me</h2>
                        <p className="mb-2">I have been interested in cybersecurity since high school. I particularly enjoy solving puzzles, research, and investigations. I'm continually developing my skills in detection, analysis, and cyber defense through hands-on labs, CTFs, and personal projects.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl mb-2">Education</h2>
                        <p className="">Master of Cybersecurity & Threat Intelligence</p>
                        <p className="mb-2">HBSc Information Security & Mathematical Sciences</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
