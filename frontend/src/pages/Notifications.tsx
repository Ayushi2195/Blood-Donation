import { useEffect, useState } from "react";
import { getFromBackend, patchToBackend } from "../store/fetchdata";
import { baseUrl } from "../url";

type Notification = {
  _id: string;
  type: string;
  status: string;
  data: any;
  createdAt: string;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messageMap, setMessageMap] = useState<Record<string, string>>({});

  const fetchNotifications = async () => {
    try {
      const res = await getFromBackend(`${baseUrl}/api/notifications/my`);
      setNotifications(res.data);
      console.log("response", res.data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleResponse = async (id: string, status: "approved" | "denied") => {
    const message = messageMap[id] || "";
    try {
      const res = await patchToBackend(`${baseUrl}/api/notifications/response/${id}`, {
        status,
        message,
      });
      alert(`Response sent to patient: ${status}`);
      fetchNotifications(); // Refresh
    } catch (error) {
      console.error("Error sending response:", error);
      alert("Failed to send response.");
    }
  };

  const renderNotification = (notif: Notification) => {
    const { type, status, data, _id } = notif;
    const time = new Date(notif.createdAt).toLocaleString();

    if (type === "patient_request") {
      return (
        <div className="p-4 bg-white rounded shadow space-y-2 border">
          <div className="text-gray-800 font-medium">📨 Blood request from <strong>{data.patientName}</strong> ({data.bloodType})</div>
          <div className="text-sm text-gray-600">Phone: {data.patientPhone}</div>
          <div className="text-xs text-gray-400">Status: {status} • {time}</div>

          {status === "pending" && (
            <div className="space-y-2 mt-2">
              <textarea
                placeholder="Optional message to patient..."
                className="w-full p-2 border rounded"
                value={messageMap[_id] || ""}
                onChange={(e) => setMessageMap({ ...messageMap, [_id]: e.target.value })}
              />
              <div className="flex gap-2">
                <button
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleResponse(_id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleResponse(_id, "denied")}
                >
                  Deny
                </button>
              </div>
            </div>
          )}
        </div>
      );
    } else if (type === "donor_approval") {
      return (
        <div className="p-4 bg-green-50 rounded border border-green-200 space-y-1">
          <div className="text-green-900">✅ Donor <strong>{data.donorName}</strong> has <strong>{status}</strong> your request.</div>
          {data.message && <div className="italic">“{data.message}”</div>}
          {status === "approved" && (
            <div className="text-sm font-bold">📞 Contact: {data.donorPhone}</div>
          )}
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      );
    } else if (type === "emergency") {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded shadow space-y-1">
          <div className="text-sm text-red-900 font-semibold">🚨 Emergency: {data.patientName} needs {data.unitsNeeded} unit(s) of {data.bloodType}</div>
          <div className="text-sm">Hospital: {data.hospitalName}, {data.hospitalLocation}</div>
          <div className="text-sm">Contact: {data.patientPhone}</div>
          <div className="text-xs text-gray-400">Urgency: {data.urgency} • {time}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <div className="text-gray-600 text-center">No notifications yet.</div>
      ) : (
        notifications.map((notif) => (
          <div key={notif._id}>{renderNotification(notif)}</div>
        ))
      )}
    </div>
  );
};

export default Notifications;
