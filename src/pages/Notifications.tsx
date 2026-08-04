import AIAssistant from "@/pages/AIAssistant";
import { useState } from "react";
import { Bell } from "lucide-react";


const initialNotifications = [
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

const Notifications = () => {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [reservations, setReservations] = useState<any[]>([]);

  const removeNotification = (
    notificationId,
    delay = 1000
  ) => {
    setTimeout(() => {
        setNotifications((previousNotifications) => 
            previousNotifications.filter(
                (notification) => notificationId !== notification.id
            )
        );
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
    <div className="min-h-full p-6 gap-10">
        <div
            className="flex w-fit items-center gap-3 rounded-[60px] border border-[#DDD6FE] bg-[#EDE9FE] px-6 py-3 shadow-sm"
        >
            <h4 className="text-xl font-bold text-[#29255E]">Notifications</h4>
            <Bell />
        </div>
      <div className="mt-10 flex flex-col gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex w-full items-center rounded-[60px] border border-[#DDD6FE] bg-[#EDE9FE] px-10 py-3 shadow-sm"
          >
            <div>
              <h2 className="text-xl font-bold text-[#29255E]">
                {notification.message}
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                {formatDate(notification.date)},{" "}
                {notification.startTime}–{notification.endTime}
              </p>
            </div>

            {notification.status === "pending" && (
              <div className="ml-auto flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleAccept(notification)}
                  className="rounded-[60px] bg-[#6D28D9] px-8 py-2 font-bold text-white hover:bg-[#5B21B6]"
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={() => handleDecline(notification.id)}
                  className="rounded-[60px] border border-[#6D28D9] bg-white px-8 py-2 font-bold text-[#6D28D9] hover:bg-[#F5F3FF]"
                >
                  Decline
                </button>
              </div>
            )}

            {notification.status === "accepted" && (
              <span className="ml-auto font-bold text-green-600">
                Reserved
              </span>
            )}

            {notification.status === "declined" && (
              <span className="ml-auto font-bold text-[#F87171]">
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




