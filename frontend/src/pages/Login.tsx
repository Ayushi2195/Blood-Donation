import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../url";
import { postToBackend } from "../store/fetchdata.ts";
import { motion } from "framer-motion";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const response = await postToBackend(`${baseUrl}/api/auth/login`, { email, password }, false);
            const { accessToken } = response.data;

            localStorage.setItem('token', accessToken);
            console.log(`Login successful for email: ${email}`);
            navigate("/"); // Navigate to home/dashboard after login
        } catch (err: any) {
            setError(err.response?.data?.error || "Login failed. Please check your credentials.");
        }
    };

    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 1.8, type: "spring", ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen w-screen bg-rose-100"
        >
            <div className="w-[600px] h-[600px] bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-rose-300">
                <h2 className="text-2xl font-semibold mb-10 text-center text-red-700 tracking-tight">Sign in your account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center w-full">
                    <div className="w-full max-w-xs mx-auto">
                        <input
                            type="email"
                            className="w-full px-5 py-3 border border-gray-200 rounded-lg"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full max-w-xs mx-auto">
                        <input
                            type="password"
                            className="w-full px-5 py-3 border border-gray-200 rounded-lg"
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
                            className="w-full bg-emerald-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-emerald-600"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-8 flex flex-col items-center gap-3 w-full">
                    <Link to="#" className="text-violet-600 font-semibold hover:underline">Forgot your password?</Link>
                    <div className="text-gray-500 text-base">
                        First time here?{" "}
                        <Link to="/signup" className="text-violet-700 font-bold hover:underline">Create an account</Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
