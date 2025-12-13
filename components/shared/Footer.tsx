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
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/about" className="hover:underline">About</Link></li>
                        <li><Link href="/projects" className="hover:underline">Projects</Link></li>
                        <li><Link href="/resume" className="hover:underline">Resume</Link></li>
                        <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 xl:col-span-1 mb-2">
                    <ul>
                        <li className="text-2xl mb-2">Socials</li>
                        <li>
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 inline-flex items-center" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-3.5v-10h3.5v10zm-1.75-11.268c-1.122 0-2.031-.919-2.031-2.046 0-1.128.909-2.047 2.031-2.047s2.031.919 2.031 2.047c0 1.127-.909 2.046-2.031 2.046zm13.5 11.268h-3.5v-5.5c0-1.31-.026-2.995-1.826-2.995-1.828 0-2.106 1.426-2.106 2.902v5.593h-3.5v-10h3.361v1.367h.048c.468-.887 1.612-1.826 3.315-1.826 3.546 0 4.162 2.334 4.162 5.364v5.095z" />
                                </svg>
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <span className="mx-2"></span>
                            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 inline-flex items-center" aria-label="GitHub">
                                <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" aria-hidden="true">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.656 1.653.244 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.62-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                                </svg>
                                <span className="sr-only">GitHub</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 xl:col-span-1 mb-2">
                    <ul>
                        <li className="text-2xl mb-2">Contact</li>
                        <li>jonathan.yu.03@icloud.com</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
