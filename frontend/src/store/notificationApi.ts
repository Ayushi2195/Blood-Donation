import { getFromBackend } from "../store/fetchdata";
import { patchToBackend } from "../store/fetchdata";

import { baseUrl } from "../url";

export const fetchMyNotifications = async () => {
    const res = await getFromBackend(`${baseUrl}/api/notifications/my`);
    return res.data;
};

export const sendNotificationResponse = async (notificationId: string, status: "approved" | "denied", message?: string) => {
    const res = await patchToBackend(
        `${baseUrl}/api/notifications/response/${notificationId}`,
        { status, message }
    );
    return res.data;
};
