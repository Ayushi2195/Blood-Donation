import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center pt-32 min-h-screen px-4 bg-gradient-to-b from-red-50 to-white"
      style={{ marginLeft: '7cm' }}
    >
      <h1 className="text-4xl font-extrabold mb-2 text-red-700 text-center">Your Words Can Spark Hope</h1>
      <p className="mb-6 text-lg text-gray-700 max-w-2xl text-center">
        Every great movement begins with a single voice. Whether you need any help, have any issues, want to volunteer, share feedback, or simply say hello, we're eager to hear from you. 
        <span className="font-semibold text-red-600">Together, we can build a future where no one waits for the gift of life.</span> 
        Drop us a message—let's create a ripple of kindness that reaches every corner of our community.
      </p>
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Contact Us</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8 text-lg">
            Thank you for reaching out! Your message has been sent. We appreciate your interest and will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input className="w-full mb-3 p-2 border rounded bg-gray-100 text-black" type="text" placeholder="Your Name" required />
            <input className="w-full mb-3 p-2 border rounded bg-gray-100 text-black" type="email" placeholder="Your Email" required />
            <textarea className="w-full mb-3 p-2 border rounded bg-gray-100 text-black" placeholder="Your Message" rows={4} required></textarea>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full" type="submit">Send</button>
          </form>
        )}
      </div>
    </motion.div>
  );
} 