import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Most healthy adults aged 18-65 can donate blood. Eligibility depends on your weight, general health, and medical history. People with certain medical conditions, recent surgeries, or those taking specific medications may be temporarily or permanently deferred. Always check with your local blood center for specific eligibility criteria.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 3 months (12 weeks) to allow your body time to replenish its blood supply. Platelet and plasma donations can be made more frequently, sometimes every 2-4 weeks, depending on local guidelines and your health status. Always follow the advice of your blood donation center.",
  },
  {
    question: "Is blood donation safe?",
    answer:
      "Yes! Blood donation is a safe process. All needles and collection equipment are sterile, used only once, and then discarded. The process is overseen by trained medical professionals who monitor donors for any adverse reactions. Most people feel fine after donating, though some may feel lightheaded or tired for a short time.",
  },
  {
    question: "How long does a blood donation take?",
    answer:
      "The actual blood donation usually takes about 10-15 minutes. However, the entire process—including registration, a brief health screening, donation, and a short rest with refreshments—typically takes about an hour. This ensures your safety and comfort throughout the process.",
  },
  {
    question: "Will donating blood hurt?",
    answer:
      "You may feel a quick pinch when the needle is inserted, but most donors describe the process as nearly painless. Some people may experience minor bruising or soreness at the needle site, but these effects are temporary and usually resolve quickly.",
  },
  {
    question: "What should I do before and after donating?",
    answer:
      "Before donating, eat a healthy meal and drink plenty of water. Avoid fatty foods and strenuous exercise. After donating, rest for a few minutes, enjoy a snack and drink, and avoid heavy lifting or vigorous activity for the rest of the day. If you feel unwell, inform the staff immediately.",
  },
  {
    question: "Can I donate blood if I have a tattoo or piercing?",
    answer:
      "You can donate blood if your tattoo or piercing was done at a licensed facility and has fully healed, usually after 6 months. This waiting period helps prevent the risk of infection. Always check with your local blood center for their specific guidelines.",
  },
  {
    question: "What are the benefits of donating blood?",
    answer:
      "Donating blood helps save lives and supports your community. You receive a mini health check, which can help detect potential health issues. Some studies suggest regular donation may reduce the risk of certain diseases. Most importantly, you make a direct, positive impact on people in need.",
  },
  {
    question: "What blood types are most needed?",
    answer:
      "All blood types are needed, but type O negative is especially valuable because it can be given to patients of any blood type in emergencies. Type AB plasma is also universal. However, every donation is important, regardless of your blood type.",
  },
  {
    question: "Can I donate blood if I am fasting?",
    answer:
      "It is not recommended to donate blood while fasting. You should eat a healthy meal and be well-hydrated before donating to avoid feeling faint or unwell during or after the donation.",
  },
  {
    question: "Can I donate blood after recovering from COVID-19?",
    answer:
      "Yes, you can donate blood after recovering from COVID-19, but you should wait at least 14 days after your symptoms have resolved and you are fully recovered. Always check with your local blood center for their specific guidelines.",
  },
  {
    question: "Can I donate blood if I have traveled recently?",
    answer:
      "Travel to certain countries may temporarily prevent you from donating blood due to the risk of infectious diseases. Always inform the staff about your recent travel history during your health screening.",
  },
  {
    question: "What should I bring with me to donate blood?",
    answer:
      "Bring a valid photo ID, a list of any medications you are taking, and be sure to wear comfortable clothing with sleeves that can be rolled up. You may also want to bring a snack and a bottle of water for after your donation.",
  },
  {
    question: "Can I donate blood if I am taking medication?",
    answer:
      "It depends on the type of medication you are taking. Many common medications do not prevent you from donating blood, but some may require a waiting period or temporary deferral. Always inform the staff about any medications you are taking during your health screening so they can determine your eligibility.",
  },
];

export default function FAQ() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen pt-32 px-4 w-screen"
    >
      <h1 className="w-full text-3xl font-bold mb-8 text-center md:ml-8">FAQ's</h1>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-4 mx-auto md:ml-8">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-8 w-screen md:w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">{faq.question}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 