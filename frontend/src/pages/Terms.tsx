import React, { useEffect, useState } from "react";
export default function Terms() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(false);
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ marginLeft: '7.5cm' }}
    >
      <div className="bg-white rounded-xl shadow p-8 max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 text-red-700">Terms & Conditions</h1>
        <p className="max-w-2xl text-center mb-6 text-black">By using LifeDrop, you agree to the following terms and conditions. Please read them carefully before using our platform.</p>
        <ul className="list-disc max-w-xl text-gray-700 space-y-2 mb-6">
          <li>LifeDrop is a platform to connect blood donors and recipients. We do not provide medical advice or emergency services.</li>
          <li>Users are responsible for providing accurate and truthful information during registration and requests.</li>
          <li>All personal data is handled in accordance with our Privacy Policy.</li>
          <li>LifeDrop is not liable for any direct or indirect damages resulting from the use of this platform.</li>
          <li>Users must comply with all applicable laws and regulations regarding blood donation and transfusion.</li>
          <li>We reserve the right to update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.</li>
        </ul>
        <p className="text-sm text-gray-500">For more information, please contact our support team.</p>
      </div>
    </div>
  );
} 