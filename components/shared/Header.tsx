import Link from "next/link";

const Header = () => {
    return (
        <header className="flex items-center justify-between w-full px-8 py-4 fixed top-0">
            <Link href="/" className="text-lg font-bold">Jonathan Yu</Link>
            <nav className="space-x-4">
                <Link href="/tools" className="hover:underline">Tools</Link>
                <Link href="/projects" className="hover:underline">Projects</Link>
                <Link href="/resume" className="hover:underline">Resume</Link>
            </nav>
        </header>
    );
}

export default Header;
