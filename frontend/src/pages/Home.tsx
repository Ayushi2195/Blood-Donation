import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroBloodDrop from "../assets/hero-blood-drop.png";

const stories = [
  {
    name: "Amit Sharma",
    quote: "LifeDrop helped me find a donor in just a few hours. Forever grateful for this platform!",
    story: `I was in urgent need of blood for my father's surgery. We were running out of time and hope. That's when I found LifeDrop. Within hours, we were connected to a kind donor who came to the hospital and donated blood. My father's surgery was successful, and we are forever grateful to the donor and the LifeDrop team. This platform truly saves lives!`,
    donorNumber: "+91 98765 43210",
  },
  {
    name: "Priya Singh",
    quote: "Donating blood through LifeDrop was easy and rewarding. I felt like a real hero!",
    story: `I always wanted to help others but didn't know where to start. LifeDrop made it so easy to register as a donor. When I got the call, I was nervous, but the process was smooth and the hospital staff was very supportive. Knowing that my donation helped save a life is the best feeling ever. I encourage everyone to become a donor!`,
    donorNumber: "+91 91234 56789",
  },
  {
    name: "Dr. Rakesh Mehta",
    quote: "As a doctor, I recommend LifeDrop to all my patients in need. It saves lives every day.",
    story: `I have seen many patients struggle to find blood donors in emergencies. LifeDrop bridges this gap efficiently. I have personally witnessed several successful matches through this platform. It's a blessing for both patients and the medical community. Thank you to all the selfless donors who make a difference!`,
    donorNumber: "+91 99887 77665",
  },
  {
    name: "Rahul Verma",
    quote: "I needed blood urgently for myself, and LifeDrop connected me to a donor within hours.",
    story: `Last year, I was hospitalized due to a sudden accident and needed blood urgently. My family was panicking and we didn't know where to turn. A friend told us about LifeDrop, and we posted a request. To our relief, a donor responded almost immediately and came to the hospital to donate. I am forever grateful to that donor and to LifeDrop for saving my life in my most critical moment. This platform is a true lifesaver!`,
  },
];

const stats = [
  { label: "Donors Registered", value: 2500 },
  { label: "Requests Fulfilled", value: 1200 },
  { label: "Lives Saved", value: 3500 },
  { label: "Hospitals Partnered", value: 50 },
];

const howItWorks = [
  { icon: "📝", title: "Register", desc: "Sign up as a donor or recipient in minutes." },
  { icon: "🔍", title: "Search/Request", desc: "Find donors or submit a blood request easily." },
  { icon: "🤝", title: "Get Matched", desc: "Get matched instantly with donors or recipients." },
  { icon: "❤️", title: "Save a Life", desc: "Donate or receive blood and make a difference!" },
];

const partners = [
  { name: "Apollo Hospitals", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Apollo_Hospitals_Logo.svg" },
  { name: "Red Cross", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Emblem_of_the_Red_Cross.svg" },
  { name: "Fortis Healthcare", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Fortis_Healthcare_logo.svg" },
  { name: "AIIMS", logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/AIIMS_New_Delhi_Logo.png" },
];

const recentRequests = [
  { name: "Suman K.", blood: "A+", location: "Delhi", time: "2 min ago" },
  { name: "Ravi P.", blood: "O-", location: "Mumbai", time: "5 min ago" },
  { name: "Neha S.", blood: "B+", location: "Bangalore", time: "10 min ago" },
  { name: "Amit T.", blood: "AB-", location: "Chennai", time: "15 min ago" },
];

const testimonials = [
  { name: "Amit Sharma", quote: "LifeDrop helped me find a donor in just a few hours. Forever grateful!" },
  { name: "Priya Singh", quote: "Donating blood through LifeDrop was easy and rewarding." },
  { name: "Rahul Verma", quote: "I needed blood urgently for myself, and LifeDrop connected me to a donor within hours." },
  { name: "Dr. Rakesh Mehta", quote: "As a doctor, I recommend LifeDrop to all my patients in need. It saves lives every day." },
];

const faqPreview = [
  { q: "Who can donate blood?", a: "Most healthy adults aged 18-65 can donate blood. Eligibility depends on your weight, health, and medical history." },
  { q: "Is blood donation safe?", a: "Yes! All equipment is sterile and used only once. Donating blood is a safe process overseen by medical professionals." },
  { q: "How often can I donate?", a: "You can donate whole blood every 3 months (12 weeks) and platelets more frequently, depending on local guidelines." },
];

const trustBadges = [
  {
    icon: "🔒",
    label: "Secure & Private",
    desc: "Your data is encrypted and never shared without your consent. We use industry-standard security to protect your privacy."
  },
  {
    icon: "✅",
    label: "Trusted by 10,000+",
    desc: "LifeDrop is trusted by over 10,000 users and growing every day. Join our community of lifesavers!"
  },
  {
    icon: "🕑",
    label: "24/7 Support",
    desc: "Our support team is available around the clock to help you in any emergency or with any questions."
  },
  {
    icon: "🏥",
    label: "Partnered Hospitals",
    desc: "We work with leading hospitals to ensure safe, reliable, and fast blood donation and transfusion services."
  },
];

export default function Home() {
  const [openStory, setOpenStory] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [openBadge, setOpenBadge] = useState<number | null>(null);

  // Simple carousel auto-scroll (no longer needed, but keep for now if testimonials used elsewhere)
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center pt-32"
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div>
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900 leading-tight drop-shadow-lg">
            <span className="text-red-600">LifeDrop</span> <br />
            <span className="text-yellow-500">Save Lives, Spread Smiles</span>
          </h1>
          <p className="mb-8 text-lg text-gray-700 max-w-lg">
            Join our mission to connect blood donors and recipients instantly. Your one drop can be someone's lifeline.
          </p>
          <div className="flex gap-4">
            <a href="/emergency" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition transform hover:scale-105 active:scale-95">
              Emergency Request
            </a>
            <button
              type="button"
              onClick={() => setShowHowItWorks(true)}
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-500 transition transform hover:scale-105 active:scale-95"
            >
              How It Works
            </button>
          </div>
        </div>
        <img src={heroBloodDrop} alt="Happy blood drops" className="w-64 h-64 object-cover rounded-xl shadow-lg floating bg-white" />
      </div>
      {/* Feature Cards Section */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-16 px-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Why Choose LifeDrop?</h3>
        <p className="mb-10 text-gray-600">Here's why thousands trust us to connect donors and recipients quickly and safely.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full justify-items-center">
          {[
  {
    icon: (
      <svg className="w-10 h-10 text-red-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
      </svg>
    ),
    title: "Verified Donors",
    desc: "All donors are verified for safety and reliability.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Quick Matching",
    desc: "Find donors or recipients in your area instantly.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-blue-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "24/7 Emergency",
    desc: "Emergency requests are prioritized and notified in real-time.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-yellow-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Live Notifications",
    desc: "Stay updated with instant notifications and alerts.",
  },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {f.icon}
              <h4 className="mt-4 font-semibold text-lg text-black">{f.title}</h4>
              <p className="text-gray-600 mt-2 text-center">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Animated Statistics Section */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 mb-12 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-extrabold text-pink-600">
              {stat.value.toLocaleString()}
            </span>
            <span className="text-gray-700 mt-2 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
      {/* Recent Requests / Live Feed */}
      <div className="w-full max-w-3xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-center mb-8 text-pink-700">Recent Blood Requests</h2>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          {recentRequests.map((req, i) => (
            <div key={i} className="flex justify-between items-center border-b last:border-b-0 pb-2 last:pb-0">
              <span className="font-semibold text-gray-800">{req.name}</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-bold">{req.blood}</span>
              <span className="text-gray-500 text-sm">{req.location}</span>
              <span className="text-gray-400 text-xs">{req.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* FAQ Preview */}
      <div className="w-full max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-center mb-8 text-pink-700">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqPreview.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6">
              <div className="font-bold text-pink-600 mb-2">{faq.q}</div>
              <div className="text-gray-700 text-sm">{faq.a}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="/faq" className="text-pink-600 font-semibold hover:underline">See all FAQs &rarr;</a>
        </div>
      </div>
      {/* Trust Badges */}
      <div className="w-full max-w-4xl mx-auto mb-20 flex flex-wrap justify-center gap-8">
        {trustBadges.map((badge, i) => (
          <button
            key={i}
            className="flex flex-col items-center bg-white rounded-xl shadow p-6 w-48 cursor-pointer hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            onClick={() => setOpenBadge(i)}
            aria-label={badge.label}
          >
            <span className="text-3xl mb-2">{badge.icon}</span>
            <span className="font-semibold text-gray-700 text-center">{badge.label}</span>
          </button>
        ))}
      </div>
      {/* Trust Badge Modal */}
      {openBadge !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setOpenBadge(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl mb-4">{trustBadges[openBadge].icon}</span>
              <h3 className="text-xl font-bold mb-2 text-pink-700">{trustBadges[openBadge].label}</h3>
              <p className="text-gray-700 text-base mb-2">{trustBadges[openBadge].desc}</p>
            </div>
          </div>
        </div>
      )}
      {/* Success Stories Section */}
      <div className="w-full max-w-4xl mx-auto mt-20 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-red-600">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stories.map((story, i) => (
            <button
              key={i}
              className="relative bg-white rounded-2xl p-6 flex flex-col items-center text-center border-0 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => setOpenStory(i)}
            >
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-4 border-transparent group-hover:border-pink-400 group-focus:border-pink-500" style={{boxShadow: '0 4px 32px 0 rgba(255, 0, 128, 0.08)'}}></div>
              {/* Subtle pattern background */}
              <div className="absolute inset-0 rounded-2xl opacity-10 bg-gradient-to-br from-pink-200 via-white to-pink-100 pointer-events-none"></div>
              <svg className="w-10 h-10 text-red-400 mb-4 z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 12.4183 12 21 12 21C12 21 17 12.4183 17 8Z" />
                <circle cx="12" cy="8" r="3" />
              </svg>
              <p className="italic text-gray-700 mb-4 z-10">"{story.quote}"</p>
              <div className="font-semibold text-red-600 z-10">- {story.name}</div>
            </button>
          ))}
        </div>
        {/* Modal for full story */}
        {openStory !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={() => setOpenStory(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-xl font-bold text-red-600 text-center mb-2">{stories[openStory].name}</h3>
              <p className="italic text-gray-700 text-center mb-4">"{stories[openStory].quote}"</p>
              <p className="text-gray-800 text-center leading-relaxed mb-4">{stories[openStory].story}</p>
              <div className="mt-6 text-center text-green-600 font-semibold">Thank you for being a LifeDrop Hero!</div>
            </div>
          </div>
        )}
      </div>
      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-base font-bold"
              onClick={() => setShowHowItWorks(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-center mb-8 text-pink-700">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howItWorks.map((step, i) => (
                <div key={i} className="bg-pink-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">{step.icon}</span>
                  <span className="font-bold text-lg mb-2 text-gray-700">{step.title}</span>
                  <span className="text-gray-600">{step.desc}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}
      {/* Partners & Supporters - moved to end */}
      <div className="w-full max-w-5xl mx-auto mb-20 mt-10">
        <h2 className="text-2xl font-bold text-center mb-8 text-pink-700">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((p, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col items-center w-40 h-32 justify-center">
              <img src={p.logo} alt={p.name} className="h-12 object-contain mb-2" />
              <span className="text-xs text-gray-700 font-semibold text-center">{p.name}</span>
            </div>
          ))}
        </div>
    </div>
    </motion.div>
  );
}