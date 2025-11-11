"use client";
import "@/app/globals.css";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8">
                <h1 className="text-2xl font-bold mb-4 text-center">Jonathan Yu</h1>
                <p className="text-gray-700 mb-2 text-center">Whitby, Ontario &#9474; (249) 357-8182 &#9474; jonathan.yu.03@gmail.com</p>
                
                <h2 className="text-xl font-semibold mb-2">Education</h2>
                <p className="text-gray-700 mb-2 font-bold">University of Guelph</p>
                <span className="text-gray-700 mb-2 flex justify-between"><p>Master of Cybersecurity and Threat Intelligence</p><p className="text-gray-400">September 2026</p></span>
                <p className="text-gray-700 mb-2 font-bold">University of Toronto</p>
                <span className="text-gray-700 mb-2 flex justify-between"><p>Honours Bachelor of Science (HBSc), Information Security Specialist, Mathematical Sciences Minor</p><p className="text-gray-400">June 2025</p></span>
                
                {/* <h2 className="text-lg font-semibold mb-1">Awards & Acheivements</h2> */}

                <h2 className="text-lg font-semibold mb-1">Skills</h2>
                <p className="text-gray-700 mb-2">
                    Agile, Python, Java, C, JavaScript, SQL, Git, Docker, Microsoft Office Suite, Google Workspace, Critical Thinking, Teamwork, Time Management, 
                    Network Security, Cryptography, Penetration Testing, Vulnerability Assessment, Incident Response, Aritificial Intelligence, Machine Learning, Data Analysis
                </p>

                {/* <h2 className="text-lg font-semibold mb-1">Certifications</h2> */}

                {/* <h2 className="text-lg font-semibold mb-1">Projects</h2> */}

                {/* <h2 className="text-lg font-semibold mb-1">Volunteer Experience</h2> */}

                {/* <h2 className="text-lg font-semibold mb-1">Extracurriculars</h2> */}

                {/* <h2 className="text-lg font-semibold mb-1">Work Experience</h2> */}

                {/* <h2 className="text-lg font-semibold mb-1">Interests</h2> */}

            </div>
        </div>
    );
}

export default Page;
