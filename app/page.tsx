"use client";

import { LINKS } from "@/constants/links";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p>Welcome to my personal website!</p>
            <p>I'm interested in cybersecurity, IT, and networking. Feel free to explore my profiles and connect with me!</p>
            <p>LinkedIn: <a href={LINKS.linkedin} target="blank" className="hover:underline" >{LINKS.linkedin}</a></p>
            <p>GitHub: <a href={LINKS.github} target="blank" className="hover:underline" >{LINKS.github}</a></p>
        </div>
    );
}

export default Page;
