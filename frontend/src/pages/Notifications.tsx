import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock notification data
const initialNotifications = [
  {
    id: 1,
    type: "urgent",
    message: "Urgent: O- blood needed at City Hospital!",
    timestamp: "2024-06-01 10:30",
    read: false,
    action: "Respond",
  },
  {
    id: 2,
    type: "event",
    message: "Blood donation camp this Sunday at Community Center.",
    timestamp: "2024-05-30 09:00",
    read: false,
    action: "View Details",
  },
  {
    id: 3,
    type: "info",
    message: "Your last donation was 3 months ago. Ready to donate again?",
    timestamp: "2024-05-28 14:15",
    read: true,
    action: "Become a Donor",
  },
  {
    id: 4,
    type: "reminder",
    message: "Remember to stay hydrated before your next donation!",
    timestamp: "2024-05-25 08:00",
    read: true,
    action: null,
  },
  {
    id: 5,
    type: "urgent",
    message: "Urgent: AB+ blood required for surgery at Green Valley Clinic.",
    timestamp: "2024-05-24 16:45",
    read: false,
    action: "Respond",
  },
  {
    id: 6,
    type: "event",
    message: "Join our awareness walk for World Blood Donor Day!",
    timestamp: "2024-05-22 11:00",
    read: true,
    action: "View Details",
  },
  {
    id: 7,
    type: "info",
    message: "Your donor card is ready to download.",
    timestamp: "2024-05-20 13:30",
    read: false,
    action: "Download Card",
  },
  {
    id: 8,
    type: "reminder",
    message: "Update your contact information for better alerts.",
    timestamp: "2024-05-18 09:20",
    read: true,
    action: null,
  },
  {
    id: 9,
    type: "urgent",
    message: "Urgent: B- blood needed for accident victim at Sunrise Hospital.",
    timestamp: "2024-05-16 18:10",
    read: false,
    action: "Respond",
  },
  {
    id: 10,
    type: "event",
    message: "Thank you for attending the donor appreciation event!",
    timestamp: "2024-05-15 17:00",
    read: true,
    action: null,
  },
];

const typeLabels = {
  urgent: "Urgent",
  event: "Event",
  info: "Info",
  reminder: "Reminder",
};

const typeColors = {
  urgent: "bg-red-100 text-red-700 border-red-400",
  event: "bg-blue-100 text-blue-700 border-blue-400",
  info: "bg-green-100 text-green-700 border-green-400",
  reminder: "bg-yellow-100 text-yellow-700 border-yellow-400",
};

const typeIcons = {
  urgent: (
    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
  ),
  event: (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ),
  info: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
  ),
  reminder: (
    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
};

const pageSize = 3;

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ email: true, sms: false, inApp: true });

  // Filtered and sorted notifications
  const filtered = notifications
    .filter((n) => filter === "all" || n.type === filter)
    .sort((a, b) =>
      sort === "desc"
        ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  function markAsRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }
  function deleteNotification(id: number) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }
  function clearAll() {
    setNotifications([]);
  }
  function handleAction(action: string) {
    alert(`Action: ${action}`);
  }
  function handlePrefChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setPrefs((prev) => ({ ...prev, [name]: checked }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen pt-32 px-4 w-screen bg-rose-200"
      aria-live="polite"
    >
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-rose-600 tracking-widest"
        style={{ textTransform: 'uppercase', textShadow: '0 6px 8px rgba(0,0,0,0.25)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
      >
        NOTIFICATIONS
      </motion.h1>
      <div className="flex flex-wrap gap-4 mb-6 w-full max-w-2xl justify-between items-center bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-2xl">
        <div className="flex gap-2 items-center">
          <label htmlFor="filter" className="font-medium text-gray-700">Filter:</label>
          <select id="filter" value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }} className="border rounded p-1 bg-gray-300 text-gray-700">
            <option value="all">All</option>
            <option value="urgent">Urgent</option>
            <option value="event">Event</option>
            <option value="info">Info</option>
            <option value="reminder">Reminder</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="sort" className="font-medium text-gray-700">Sort:</label>
          <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className="border rounded p-1 bg-gray-300 text-gray-700">
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
        <button onClick={() => setShowSettings(true)} className="ml-auto bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 text-sm font-medium text-gray-700">Settings</button>
        <button onClick={clearAll} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm font-medium">Clear All</button>
      </div>
      {/* Notification List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          <div className="text-lg font-semibold">No notifications yet!</div>
        </div>
      ) : (
        <ul className="w-full max-w-2xl space-y-4" role="list">
          {filtered.map((n) => (
            <li
              key={n.id}
              className={`flex items-start gap-4 p-4 rounded-lg border shadow-lg bg-white focus-within:ring-2 focus-within:ring-red-200 transition group text-gray-700 ${n.type === 'urgent' ? 'border-red-500' : ''} ${!n.read ? "font-semibold" : "opacity-70"}`}
              tabIndex={0}
              aria-label={n.message}
              onClick={() => markAsRead(n.id)}
              onKeyDown={e => { if (e.key === "Enter") markAsRead(n.id); }}
            >
              <div className="mt-1">{(typeIcons as any)[n.type]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full border font-bold uppercase tracking-wide mr-2 bg-white/80 text-gray-700">{(typeLabels as any)[n.type]}</span>
                  <span className="text-xs text-gray-500">{n.timestamp}</span>
                </div>
                <div className="mt-1 mb-2 text-base text-gray-700">{n.message}</div>
                {n.action && (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs font-medium mr-2"
                    onClick={e => { e.stopPropagation(); handleAction(n.action as string); }}
                  >
                    {n.action}
                  </button>
                )}
              </div>
              <button
                className="text-gray-400 hover:text-red-600 w-7 h-7 flex items-center justify-center rounded-full border-0 p-0"
                aria-label="Delete notification"
                onClick={e => { e.stopPropagation(); deleteNotification(n.id); }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-600" onClick={() => setShowSettings(false)} aria-label="Close settings">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-600">Notification Preferences</h2>
            <form className="space-y-3">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" name="email" checked={prefs.email} onChange={handlePrefChange} />
                Email Notifications
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" name="sms" checked={prefs.sms} onChange={handlePrefChange} />
                SMS Notifications
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" name="inApp" checked={prefs.inApp} onChange={handlePrefChange} />
                In-App Notifications
              </label>
            </form>
            <button className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full font-medium" onClick={() => setShowSettings(false)}>
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}