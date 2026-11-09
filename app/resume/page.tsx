"use client";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-[80%] p-8">
                <h1 className="text-3xl mb-4 text-center">Jonathan Yu</h1>
                <h2 className="text-2xl mb-2">Education</h2>
                <span className="mb-2 flex justify-between"><h3 className="text-xl">University of Guelph</h3><p>2025 - 2026</p></span>
                <p className="mb-2">Master of Cybersecurity and Threat Intelligence</p>
                <span className="mb-2 flex justify-between"><h3 className="text-xl">University of Toronto</h3><p>2021 - 2025</p></span>
                <p className="mb-2">Honours Bachelor of Science (HBSc), High Distinction, Information Security Specialist, Mathematical Sciences Minor</p>
            </div>
        </div>
    );
}

export default Page;
