/**
 * Just for fun
 * Code mainly generated using AI
 */

"use client";
import "@/app/globals.css";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

interface CatState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    av: number; // angular velocity
}

const PAGE_WIDTH = typeof window !== "undefined" ? window.innerWidth : 0;
const PAGE_HEIGHT = typeof window !== "undefined" ? window.innerHeight : 0;

const ImageSize = 200;

const Page = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cats, setCats] = useState<CatState[]>([
        { x: 50, y: 50, vx: 2, vy: 3, angle: 0, av: 0.05 },
        { x: 300, y: 200, vx: -3, vy: 2, angle: 0, av: -0.04 },
    ]);

    useEffect(() => {
        let animationFrameId: number;

        const update = () => {
            setCats(prev => {
                const newCats = prev.map((c, i) => {
                    let nx = c.x + c.vx;
                    let ny = c.y + c.vy;
                    let nvx = c.vx;
                    let nvy = c.vy;
                    let nangle = c.angle + c.av;
                    let nav = c.av;

                    // boundary collision with container
                    const width = containerRef.current?.clientWidth ?? PAGE_WIDTH;
                    const height = containerRef.current?.clientHeight ?? PAGE_HEIGHT;

                    if (nx <= 0) { nx = 0; nvx = -nvx; }
                    if (ny <= 0) { ny = 0; nvy = -nvy; }
                    if (nx + ImageSize >= width) { nx = width - ImageSize; nvx = -nvx; }
                    if (ny + ImageSize >= height) { ny = height - ImageSize; nvy = -nvy; }

                    return { x: nx, y: ny, vx: nvx, vy: nvy, angle: nangle, av: nav };
                });

                // check collisions between cats
                if (newCats.length >= 2) {
                    const a = newCats[0];
                    const b = newCats[1];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < ImageSize) {
                        // simple elastic swap velocities and spin
                        const tempVx = a.vx;
                        const tempVy = a.vy;
                        const tempAv = a.av;
                        newCats[0].vx = b.vx;
                        newCats[0].vy = b.vy;
                        newCats[0].av = b.av;
                        newCats[1].vx = tempVx;
                        newCats[1].vy = tempVy;
                        newCats[1].av = tempAv;
                    }
                }

                return newCats;
            });
            animationFrameId = requestAnimationFrame(update);
        };

        animationFrameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-gray-100"
        >
            {cats.map((cat, idx) => (
                <Image
                    key={idx}
                    src={`/cat${idx + 1}.png`}
                    alt="Cat Image"
                    width={ImageSize}
                    height={ImageSize}
                    style={{
                        position: "absolute",
                        left: cat.x,
                        top: cat.y,
                        userSelect: "none",
                        transform: `rotate(${cat.angle}rad)`,
                        transformOrigin: "center center",
                    }}
                    priority
                />
            ))}
        </div>
    );
};

export default Page;
