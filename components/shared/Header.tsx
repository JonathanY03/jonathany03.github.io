import Link from 'next/link'
import "@/app/globals.css";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-4 py-2 sticky top-0 shadow-md bg-white">
            <div className="text-lg font-bold">
                <Link href="/">Jonathan Yu</Link>
            </div>
            <nav className="space-x-4">
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/projects" className="hover:underline">Projects</Link>
                <Link href="/resume" className="hover:underline">Resume</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
            </nav>
        </header>
    );
}

export default Header;
