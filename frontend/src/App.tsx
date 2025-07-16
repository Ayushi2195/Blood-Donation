import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import FindDonor from "./pages/FindDonor";
import BecomeDonor from "./pages/BecomeDonor";
import Emergency from "./pages/Emergency";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Testimonials from "./pages/Testimonials";
import AdminDashboard from "./pages/AdminDashboard";
import HowItWorks from "./pages/HowItWorks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "@/store/auth.tsx"; 

function App() {
  return (
    <AuthProvider>
      {/* Decorative SVG Blobs */}
      <svg className="fixed top-0 left-0 w-96 h-96 opacity-30 -z-10 pointer-events-none" viewBox="0 0 200 200">
        <path fill="#FFB6B6" d="M40.5,-67.6C52.2,-60.2,61.7,-52.2,68.2,-41.6C74.7,-31,78.2,-17.8,77.2,-4.9C76.2,8,70.7,20.6,63.2,32.2C55.7,43.8,46.2,54.3,34.7,60.7C23.2,67.1,9.6,69.4,-3.7,73.7C-17,78,-30,84.3,-41.2,80.2C-52.4,76.1,-61.8,61.7,-67.2,47.1C-72.6,32.5,-74,17.7,-74.2,2.7C-74.4,-12.3,-73.4,-27.4,-66.2,-38.7C-59,-50,-45.6,-57.5,-32.1,-64.1C-18.6,-70.7,-9.3,-76.4,2.1,-79.2C13.5,-82,27,-81.9,40.5,-67.6Z" transform="translate(100 100)" />
      </svg>
      <svg className="fixed bottom-0 right-0 w-96 h-96 opacity-20 -z-10 pointer-events-none" viewBox="0 0 200 200">
        <path fill="#A5DEE5" d="M40.5,-67.6C52.2,-60.2,61.7,-52.2,68.2,-41.6C74.7,-31,78.2,-17.8,77.2,-4.9C76.2,8,70.7,20.6,63.2,32.2C55.7,43.8,46.2,54.3,34.7,60.7C23.2,67.1,9.6,69.4,-3.7,73.7C-17,78,-30,84.3,-41.2,80.2C-52.4,76.1,-61.8,61.7,-67.2,47.1C-72.6,32.5,-74,17.7,-74.2,2.7C-74.4,-12.3,-73.4,-27.4,-66.2,-38.7C-59,-50,-45.6,-57.5,-32.1,-64.1C-18.6,-70.7,-9.3,-76.4,2.1,-79.2C13.5,-82,27,-81.9,40.5,-67.6Z" transform="translate(100 100)" />
      </svg>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/find-donor" element={<FindDonor />} />
          <Route path="/become-donor" element={<BecomeDonor />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
