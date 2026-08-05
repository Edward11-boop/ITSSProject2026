import AIAssistant from "@/pages/AIAssistant";
import { useState } from "react";
import { Bell } from "lucide-react";

export const initialNotifications = [
  {
    id: 1,
    message: "Andrei invited you to book a seat together.",
    date: "2026-08-05",
    startTime: "09:00",
    endTime: "17:00",
    status: "pending",
    isRead: false,
  },
  {
    id: 2,
    message: "Your colleagues are coming to the office.",
    date: "2026-10-09",
    startTime: "09:00",
    endTime: "17:00",
    status: "pending",
    isRead: false,
  },
  {
    id: 3,
    message: "Your colleagues are coming to the office.",
    date: "2026-10-25",
    startTime: "09:00",
    endTime: "17:00",
    status: "pending",
    isRead: false,
  },
  {
    id: 4,
    message: "Your colleagues are coming to the office.",
    date: "2026-10-25",
    startTime: "09:00",
    endTime: "17:00",
    status: "pending",
    isRead: false,
  },
];

type NotificationsProps = {
  onNotificationRemoved?: () => void;
};

const Notifications = ({ onNotificationRemoved }: NotificationsProps) => {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [reservations, setReservations] = useState<any[]>([]);

  const removeNotification = (
    notificationId,
    delay = 1000
  ) => {
    setTimeout(() => {
      let wasRemoved = false;

      setNotifications((previousNotifications) => {
        wasRemoved = previousNotifications.some(
          (notification) => notificationId === notification.id
        );

        return previousNotifications.filter(
          (notification) => notificationId !== notification.id
        );
      });

      if (wasRemoved) {
        onNotificationRemoved?.();
      }
    }, delay)
  };

  const handleAccept = (notification) => {
    const newReservation = {
      id: Date.now(),
      date: notification.date,
      startTime: notification.startTime,
      endTime: notification.endTime,
      notificationId: notification.id,
    };

    setReservations((previousReservations) => [
      ...previousReservations,
      newReservation,
    ]);

    setNotifications((previousNotifications) =>
      previousNotifications.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              status: "accepted",
              isRead: true,
            }
          : item
      )
    );

    removeNotification(notification.id);
  };

  const handleDecline = (notificationId) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((item) =>
        item.id === notificationId
          ? {
              ...item,
              status: "declined",
              isRead: true,
            }
          : item
      )
    );

    removeNotification(notificationId);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("ro-RO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  return (
    <div className="min-h-full gap-10 p-4 sm:p-6">
        <div
            className="flex w-fit items-center gap-3 rounded-[60px] border border-[#DDD6FE] bg-[#EDE9FE] px-6 py-3 shadow-sm"
        >
            <h4 className="text-base font-bold text-[#29255E] sm:text-xl">Notifications</h4>
            <Bell />
        </div>
      <div className="mt-10 flex flex-col gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex w-full flex-col gap-4 rounded-[32px] border border-[#DDD6FE] bg-[#EDE9FE] px-5 py-4 shadow-sm md:flex-row md:items-center md:rounded-[60px] md:px-10 md:py-3"
          >
            <div>
              <h2 className="text-base font-bold text-[#29255E] sm:text-xl">
                {notification.message}
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                {formatDate(notification.date)},{" "}
                {notification.startTime}-{notification.endTime}
              </p>
            </div>

            {notification.status === "pending" && (
              <div className="flex w-full flex-wrap items-center gap-3 md:ml-auto md:w-auto md:gap-4">
                <button
                  type="button"
                  onClick={() => handleAccept(notification)}
                  className="rounded-[60px] bg-[#6D28D9] px-5 py-2 font-bold text-white hover:bg-[#5B21B6] sm:px-8"
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={() => handleDecline(notification.id)}
                  className="rounded-[60px] border border-[#6D28D9] bg-white px-5 py-2 font-bold text-[#6D28D9] hover:bg-[#F5F3FF] sm:px-8"
                >
                  Decline
                </button>
              </div>
            )}

            {notification.status === "accepted" && (
              <span className="font-bold text-green-600 md:ml-auto">
                Reserved
              </span>
            )}

            {notification.status === "declined" && (
              <span className="font-bold text-[#F87171] md:ml-auto">
                Declined
              </span>
            )}
          </div>
        ))}
      </div>
      <AIAssistant />
    </div>
  );
};

export default Notifications;