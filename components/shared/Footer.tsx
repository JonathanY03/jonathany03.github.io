import Link from 'next/link'
import "@/app/globals.css";

const linkedin = "https://www.linkedin.com/in/jonathany03";
const github = "https://github.com/JonathanY03";

const Footer = () => {
    return (
        <footer className="w-screen items-center justify-center px-8 py-4 bg-gray-800 text-white ">
            <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-5 mb-2">
                <div className="md:col-span-2 xl:col-span-2">
                    <h1 className="text-2xl mb-2">Jonathan Yu</h1>
                    <p>This is my personal website!</p>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 xl:col-span-1 mb-2">
                    <ul>
                        <li className="text-2xl mb-2">Links</li>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/resume">Resume</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 xl:col-span-1 mb-2">
                    <ul>
                        <li className="text-2xl mb-2">Social</li>
                        <li><Link href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</Link></li>
                        <li><Link href={github} target="_blank" rel="noopener noreferrer">GitHub</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 xl:col-span-1 mb-2">
                    <ul>
                        <li className="text-2xl mb-2">Contact</li>
                        <li>Jonathan Yu</li>
                        <li>+1 (249) 357-8182</li>
                        <li>jonathan.yu.03@gmail.com</li>
                    </ul>
                </div>
            </div>
            <p className="text-center text-sm mt-2 text-gray-400">
                &copy; 2025 Jonathan Yu. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
