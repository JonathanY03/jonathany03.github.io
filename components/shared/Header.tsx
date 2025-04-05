import Link from 'next/link'
import "@/app/globals.css";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-4 py-2 position-sticky top-0 shadow-md">
            <div className="text-lg font-bold">
                <Link href="/">Jonathan Yu</Link>
            </div>
            <nav className="space-x-4">
                <Link href="/about">About</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/resume">Resume</Link>
                <Link href="/blog">Blog</Link>
            </nav>
        </header>
    );
}

export default Header;
