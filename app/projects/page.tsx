"use client";
import Link from "next/link";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-[80%] p-8">
                <h1 className="text-3xl mb-4 text-center">Projects</h1>
                
                <h2 className="text-2xl mb-2">Machine Learning</h2>
                <span className="mb-2 flex justify-between"><Link href="/projects/machine-learning/digit-classifier" className="hover:underline"><h3 className="text-xl">MNIST Digit Classifier</h3></Link><p>2026</p></span>
                <p className="mb-2">Recreation and demo of my first machine learning project at The University of Toronto. A simple digit classifier trained on the MNIST hand-written digits dataset.</p>
                
                <h2 className="text-2xl mb-2">Cybersecurity</h2>
                <span className="mb-2 flex justify-between"><Link href="/projects/password-demo" className="hover:underline"><h3 className="text-xl">Password Demo</h3></Link><p>2025</p></span>
                <p className="mb-2">Simplified demo of how passwords are created, stored, and verified securely.</p>
                
                <h2 className="text-2xl mb-2">Games</h2>
                <span className="mb-2 flex justify-between"><Link href="/projects/connect-4" className="hover:underline"><h3 className="text-xl">Connect 4</h3></Link><p>2025</p></span>
                <p className="mb-2">Connect 4 game. Play against AI or a friend.</p>
            </div>
        </div>
    );
}

export default Page;
