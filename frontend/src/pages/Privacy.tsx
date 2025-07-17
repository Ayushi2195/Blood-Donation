import React, { useEffect, useState } from "react";
export default function Privacy() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(false);
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 pt-32 w-screen bg-gradient-to-b from-rose-150 to-rose-200 transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <div className="bg-white rounded-xl shadow p-8 max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 text-red-700 text-center">Privacy Policy</h1>
        <p className="text-black text-center mb-6">
          Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it. This policy explains what data we collect, how we use it, and the choices you have regarding your information.
        </p>
        <h2 className="mb-2 text-black">What We Collect</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Personal details such as your name, email, and contact information when you register or contact us.</li>
          <li>Information about your blood type and donation history (if you choose to provide it).</li>
          <li>Technical data such as your device, browser, and usage patterns to improve our service.</li>
        </ul>
        <h2 className="mb-2 text-black">How We Use Your Data</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>To connect donors and recipients safely and efficiently.</li>
          <li>To communicate with you about your account, requests, or updates.</li>
          <li>To improve our platform and ensure security for all users.</li>
        </ul>
        <h2 className="mb-2 text-black">Your Choices & Rights</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>You can update or delete your information at any time by contacting us.</li>
          <li>We do not share your personal data with third parties without your consent, except as required by law.</li>
          <li>All sensitive data is encrypted and stored securely.</li>
          <li><a href="https://www.flaticon.com/free-stickers/blood-donation" title="blood donation stickers">Blood donation stickers created by vectorsmarket15 - Flaticon</a></li>
        </ul>
        <h2 className="mb-2 text-black">Contact Us</h2>
        <p className="text-gray-700">If you have any questions or concerns about your privacy, please contact our support team. We are here to help and ensure your information is safe with us.</p>
      </div>
    </div>
  );
} 