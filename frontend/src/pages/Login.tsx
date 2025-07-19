import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../url";
import { postToBackend } from "../store/fetchdata.ts";
import { motion } from "framer-motion";
import { useAuth } from "../store/auth.tsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const response = await postToBackend(`${baseUrl}/api/auth/login`, { email, password }, false);
            const { accessToken } = response.data;
            storeTokenInLS(accessToken);
            console.log(`Login successful for email: ${email}`);
            navigate("/"); 
        } catch (err: any) {
            setError(err.response?.data?.error || "Login failed. Please check your credentials.");
        }
    };

    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 1.2, type: "spring", ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-b from-rose-150 to-rose-200 pt-16"
        >
            <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-rose-200">
                {/* Left: Illustration or Quote */}
                <div className="hidden md:flex flex-col items-center justify-center bg-rose-100 w-1/2 p-10">
                    {/* Placeholder SVG illustration */}
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="60" fill="#f43f5e" fillOpacity="0.15" />
                        <path d="M60 90c-15-10-30-25-30-40a30 30 0 1160 0c0 15-15 30-30 40z" fill="#f43f5e" fillOpacity="0.3" />
                    </svg>
                    <div className="mt-8 text-center text-rose-600 font-semibold text-lg">
                        "A single drop can save a life. Join the movement."
                    </div>
                </div>
                {/* Right: Login Form */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16">
                    {/* Logo */}
                    <div className="mb-6 flex items-center gap-2">
                        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" /></svg>
                        <span className="text-2xl font-extrabold text-red-600 tracking-tight">LifeDrop</span>
                    </div>
                    <h2 className="font-extrabold mb-10 text-center text-red-700 tracking-tight" style={{ fontSize: '29px' }}>Sign in your account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center w-full">
                    <div className="w-full max-w-xs mx-auto">
                        <input
                            type="email"
                                className="w-full px-5 py-3 border border-gray-200 rounded-lg text-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full max-w-xs mx-auto">
                        <input
                            type="password"
                                className="w-full px-5 py-3 border border-gray-200 rounded-lg text-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-base text-center w-full">{error}</div>}
                    <div className="w-full max-w-xs mx-auto">
                        <button
                            type="submit"
                                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg text-lg font-bold shadow hover:from-rose-600 hover:to-pink-600 transition"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-8 flex flex-col items-center gap-3 w-full">
                        <div className="text-gray-500 text-base">
                        First time here?{" "}
                            <Link to="/signup" className="text-rose-700 font-bold hover:underline transition">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
