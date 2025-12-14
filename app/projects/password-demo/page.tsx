"use client";
import "@/app/globals.css";
import React, {useState, useRef, useEffect} from "react";
import crypto from "crypto";

const DEBUG = false;

type User = {
    username: string;
    passwordHash: string;
    salt: number;
    algorithm: string;
};

function hashPassword(password: string, salt: number, algorithm: string): string {
    let hash: string;
    const saltedPassword = password + salt.toString();
    switch (algorithm) {
        case "md5":
            hash = crypto.createHash("md5").update(saltedPassword).digest("hex");
            break;
        case "sha256":
            hash = crypto.createHash("sha256").update(saltedPassword).digest("hex");
            break;
        case "sha1":
            hash = crypto.createHash("sha1").update(saltedPassword).digest("hex");
            break;
        default:
            hash = "error";
    }
    return hash;
}

function userExists(username: string, users: User[]): boolean {
    return users.some((u) => u.username === username);
}

const Page = () => {
    const [mode, setMode] = useState<"create" | "login">("create");
    const [users, setUsers] = useState<User[]>([]);
    const [createError, setCreateError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);

    const [animating, setAnimating] = useState(false);
    const [animTarget, setAnimTarget] = useState<User | null>(null);
    const [computedHash, setComputedHash] = useState<string | null>(null);
    const [compareResult, setCompareResult] = useState<"match" | "mismatch" | null>(null);
    const timers = useRef<number[]>([]);

    const reset = () => {
        setLoginError(null);
        setCreateError(null);
        setAnimating(false);
        setAnimTarget(null);
        setComputedHash(null);
        setCompareResult(null);
    }

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const username = form.get("username");
        const password = form.get("password");
        const salt = form.get("salt");
        const algorithm = form.get("algorithm");
        if (DEBUG) console.log("Create user", { username, password, salt, algorithm });
        if (username && userExists(String(username), users)) {
            setCreateError(`user ${String(username)} already exists`);
            return;
        }
        setCreateError(null);
        setUsers([...users, {
            username: String(username),
            passwordHash: hashPassword(String(password), Number(salt), String(algorithm)),
            salt: Number(salt),
            algorithm: String(algorithm),
        }]);
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const username = form.get("username");
        const password = form.get("password");
        if (DEBUG) console.log("Login", { username, password });

        setLoginError(null);
        setCompareResult(null);
        setComputedHash(null);

        const uname = username ? String(username).trim() : "";
        if (!uname) {
            setLoginError("username is required");
            return;
        }

        const user = users.find((u) => u.username === uname);
        if (!user) {
            setLoginError("user not found");
            return;
        }

        setAnimTarget(user);
        setAnimating(true);

        timers.current.push(window.setTimeout(() => {}, 3000));

        timers.current.push(window.setTimeout(() => {
            const hash = hashPassword(String(password), Number(user.salt), String(user.algorithm));
            setComputedHash(hash);
        }, 6000));

        timers.current.push(window.setTimeout(() => {
            const hash = hashPassword(String(password), Number(user.salt), String(user.algorithm));
            const match = hash === user.passwordHash;
            setCompareResult(match ? "match" : "mismatch");
            setAnimating(false);
        }, 9000));
        
    };

    useEffect(() => {
        return () => {
            timers.current.forEach((t) => clearTimeout(t));
            timers.current = [];
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8 flex flex-col items-center justify-center space-y-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Password Demo</h1>

                <div className="flex flex-cols">
                    <div>
                        <label htmlFor="mode" className="sr-only">mode</label>
                        <select
                            id="mode"
                            value={mode}
                            onChange={(e) => {setMode(e.target.value as "create" | "login"); reset();}}
                            className="mb-6 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="create">create user</option>
                            <option value="login">login</option>
                        </select>

                        {mode === "create" ? (
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label htmlFor="create-username" className="sr-only">username</label>
                                    <input
                                        type="text"
                                        id="create-username"
                                        name="username"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="username"
                                        title="your unique username"
                                        required
                                    />
                                    <label htmlFor="create-password" className="sr-only">password</label>
                                    <input
                                        type="password"
                                        id="create-password"
                                        name="password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="password"
                                        title="your password"
                                        required
                                    />
                                    <label htmlFor="create-salt" className="sr-only">salt</label>
                                    <input
                                        type="number"
                                        id="create-salt"
                                        name="salt"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="salt"
                                        title="a number to make your password more secure"
                                        required
                                    />
                                    <label htmlFor="create-alg" className="sr-only">algorithm</label>
                                    <select
                                        id="create-alg"
                                        name="algorithm"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        title="the hashing algorithm to use"
                                        defaultValue="md5"
                                        required
                                    >
                                        <option value="md5">md5</option>
                                        <option value="sha256">sha256</option>
                                        <option value="sha1">sha1</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="hover:underline"
                                >
                                    create
                                </button>
                                {createError && (
                                    <p className="text-red-600 text-sm mt-1" role="alert">{createError}</p>
                                )}
                            </form>
                        ) : (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label htmlFor="login-username" className="sr-only">username</label>
                                    <input
                                        type="text"
                                        id="login-username"
                                        name="username"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="username"
                                        required
                                    />
                                    <label htmlFor="login-password" className="sr-only">password</label>
                                    <input
                                        type="password"
                                        id="login-password"
                                        name="password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="hover:underline"
                                >
                                    login
                                </button>
                                {loginError && (
                                    <p className="text-red-600 text-sm mt-1" role="alert">{loginError}</p>
                                )}

                                {(animating || computedHash || compareResult) && (
                                    <div className="mt-4 p-3 border rounded">
                                        <p>attempting login for: {animTarget && animTarget.username}</p>
                                        <p>found salt: {animTarget && animTarget.salt}</p>
                                        <p>found algorithm: {animTarget && animTarget.algorithm}</p>
                                        {computedHash ? <p>computed: {computedHash}</p> : <p>computing...</p>}
                                        {compareResult === null && computedHash !== null && <p>matching...</p>}
                                        {compareResult === "match" && <p>result: match <p className="text-green-500">login successfull</p></p>}
                                        {compareResult === "mismatch" && <p>result: mismatch <p className="text-red-500">login unsuccessfull</p></p>}
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                    <span className="mx-10"></span>
                    <div>
                        users
                        <div className="overflow-x-auto border rounded">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">username</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">hashed password</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">salt</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">algorithm</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((u) => {
                                        const isTarget = animTarget ? animTarget.username === u.username : false;
                                        const rowClass = isTarget
                                            ? compareResult === "match"
                                                ? "bg-green-50"
                                                : compareResult === "mismatch"
                                                    ? "bg-red-50"
                                                    : "bg-yellow-50 animate-pulse"
                                            : undefined;
                                        return (
                                            <tr key={u.username} className={rowClass}>
                                                <td className="px-4 py-2 align-top text-sm text-gray-900">{u.username}</td>
                                                <td className="px-4 py-2 align-top text-sm text-gray-700 font-mono break-all">{u.passwordHash}</td>
                                                <td className="px-4 py-2 align-top text-sm text-gray-900">{u.salt}</td>
                                                <td className="px-4 py-2 align-top text-sm text-gray-900">{u.algorithm}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
