import BackButton from "@/components/BackButton";
import AIAssistant from "@/pages/AIAssistant";
import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import NotificationItem, { type Notification } from "./components/NotificationItem";

export const initialNotifications: Notification[] = [];
type BackendNotification = {
  id: number;
  title?: string;
  message: string;
  type?: string;
  read?: boolean;
  createdAt?: string;
  invitation?: {
    id: number;
    status?: string;
    startDateTime?: string;
    endDateTime?: string;
  };
};

type NotificationsProps = {
  onNotificationRemoved?: () => void;
};

const formatTime = (value: Date) => value.toLocaleTimeString("ro-RO", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const toNotificationModel = (item: BackendNotification): Notification => {
  const start = item.invitation?.startDateTime ? new Date(item.invitation.startDateTime) : new Date();
  const end = item.invitation?.endDateTime ? new Date(item.invitation.endDateTime) : new Date();
  const normalizedStatus = (item.invitation?.status ?? "PENDING").toLowerCase();

  return {
    id: item.id,
    invitationId: item.invitation?.id,
    message: item.message || item.title || "New office invitation",
    date: start.toISOString().slice(0, 10),
    startTime: formatTime(start),
    endTime: formatTime(end),
    status: normalizedStatus === "accepted" ? "accepted" : normalizedStatus === "declined" ? "declined" : "pending",
    isRead: Boolean(item.read),
  };
};

const Notifications = ({ onNotificationRemoved }: NotificationsProps) => {
  const { user } = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const scheduledRemovalIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!user.id) {
      return;
    }

    // Only fetch unread notifications so a dismissed/accepted notification does not reappear
    fetch(`http://localhost:8080/api/notifications/me/unread`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load notifications");
        }

        return response.json() as Promise<BackendNotification[]>;
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setNotifications(data.map(toNotificationModel));
        } else {
          setNotifications([]);
        }
      })
      .catch(() => {
        setNotifications([]);
      });
  }, [user.id]);

  const removeNotification = (
    notificationId: number,
    delay = 1000
  ) => {
    if (scheduledRemovalIds.current.has(notificationId)) {
      return;
    }

    scheduledRemovalIds.current.add(notificationId);

    setTimeout(() => {
      setNotifications((previousNotifications) =>
        previousNotifications.filter(
          (notification) => notificationId !== notification.id
        )
      );

      onNotificationRemoved?.();
    }, delay)
  }

  const handleAccept = async (notification: Notification) => {
    try {
      const response = await fetch(
        notification.invitationId
          ? `http://localhost:8080/api/invitations/${notification.invitationId}/accept`
          : `http://localhost:8080/api/notifications/${notification.id}/accept`,
        {
        method: "POST",
        credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Invitation could not be accepted");
      }
    } catch {
      return;
    }

    setNotifications((previousNotifications) =>
      previousNotifications.map((item) =>
        item.id === notification.id
          ? {
            ...item,
            status: "accepted",
            isRead: true,
          }
          : item,
      ),
    );

    removeNotification(notification.id);
  }

  const handleDecline = async (notificationId: number) => {
    const notification = notifications.find((item) => item.id === notificationId);

    if (!notification) {
      return;
    }

    try {
      const response = await fetch(
        notification.invitationId
          ? `http://localhost:8080/api/invitations/${notification.invitationId}/decline`
          : `http://localhost:8080/api/notifications/${notification.id}/decline`,
        {
        method: "POST",
        credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Invitation could not be declined");
      }
    } catch {
      return;
    }

    setNotifications((previousNotifications) =>
      previousNotifications.map((item) =>
        item.id === notificationId
          ? {
            ...item,
            status: "declined",
            isRead: true,
          }
          : item,
      ),
    );

    removeNotification(notificationId);
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("ro-RO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`))
  }

  return (
    <div className="min-h-full gap-10 p-4 sm:p-6">
      <BackButton className="mb-6" fallbackTo="/dashboard" />

      <div className="flex w-fit items-center gap-3 rounded-[60px] border border-[#DDD6FE] bg-[#EDE9FE] px-6 py-3 shadow-sm">
        <h4 className="text-base font-bold text-[#29255E] sm:text-xl">Notifications</h4>
        <Bell />
      </div>

      <div className="mt-10 flex flex-col gap-4">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            formattedDate={formatDate(notification.date)}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ))}
      </div>

      <AIAssistant />
    </div>
  )
}

export default Notifications;
