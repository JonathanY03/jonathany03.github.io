"use client";
import "@/app/globals.css";
import React, { useEffect, useMemo, useState } from "react";
import Link from 'next/link';

const PAGE_SIZE = 5;

const posts = [
    { slug: "connect-4", title: "Connect 4", date: "12 December 2025", excerpt: "Basic connect 4 game for fun." },
    // Add one entry per subfolder/page in /app/projects, e.g.:
    // { slug: "your-subfolder-name", title: "Your Post Title", date: "YYYY-MM-DD", excerpt: "Short summary..." }
];

const Page = () => {
    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

    const [page, setPage] = useState<number>(() => {
        try {
            if (typeof window === "undefined") return 1;
            const params = new URLSearchParams(window.location.search);
            const p = parseInt(params.get("page") || "1", 10);
            return isNaN(p) || p < 1 ? 1 : p;
        } catch {
            return 1;
        }
    });

    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const currentPosts = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return posts.slice(start, start + PAGE_SIZE);
    }, [page]);

    const goToPage = (p: number) => {
        const next = Math.min(Math.max(1, p), totalPages);
        setPage(next);
        try {
            const url = new URL(window.location.href);
            url.searchParams.set("page", String(next));
            window.history.replaceState(null, "", url.toString());
        } catch {
            // ignore URL update errors
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1 className="text-2xl font-bold mb-4 text-center">Projects</h1>

                <div className="flex flex-col xl:col-span-1 items-stretch justify-start space-y-4">
                    {currentPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/projects/${post.slug}`}
                            className="block w-full shadow-md rounded-lg bg-white p-8 cursor-pointer hover:bg-gray-100 hover:shadow-sm transition-colors duration-150 text-left"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                {post.date && <p className="text-gray-400">{post.date}</p>}
                            </div>
                            {post.excerpt && <p className="mt-2 text-gray-700">{post.excerpt}</p>}
                        </Link>
                    ))}
                </div>

                <nav className="mt-6 flex items-center justify-center space-x-2" aria-label="Pagination">
                    <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page <= 1}
                        className="hover:underline disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => goToPage(p)}
                            aria-current={p === page ? "page" : undefined}
                            className={`${p === page ? "underline" : "no-underline"}`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page >= totalPages}
                        className="hover:underline disabled:opacity-50"
                    >
                        Next
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default Page;
