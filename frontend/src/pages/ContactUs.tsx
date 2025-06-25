import React from "react";
export default function ContactUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Have questions or need help? Reach out to us!</p>
      <form className="w-full max-w-md bg-white p-6 rounded shadow">
        <input className="w-full mb-3 p-2 border rounded" type="text" placeholder="Your Name" />
        <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Your Email" />
        <textarea className="w-full mb-3 p-2 border rounded" placeholder="Your Message" rows={4}></textarea>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full" type="submit">Send</button>
      </form>
    </div>
  );
} 