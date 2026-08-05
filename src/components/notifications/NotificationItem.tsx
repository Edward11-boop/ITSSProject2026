export type NotificationStatus = "pending" | "accepted" | "declined"

export type Notification = {
  id: number
  message: string
  date: string
  startTime: string
  endTime: string
  status: NotificationStatus
  isRead: boolean
}

type NotificationItemProps = {
  notification: Notification
  formattedDate: string
  onAccept: (notification: Notification) => void
  onDecline: (notificationId: number) => void
}

export default function NotificationItem({
  notification,
  formattedDate,
  onAccept,
  onDecline,
}: NotificationItemProps) {
  return (
    <div className="flex w-full items-center rounded-[60px] border border-[#DDD6FE] bg-[#EDE9FE] px-10 py-3 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-[#29255E]">
          {notification.message}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {formattedDate}, {notification.startTime}-{notification.endTime}
        </p>
      </div>

      {notification.status === "pending" && (
        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            onClick={() => onAccept(notification)}
            className="rounded-[60px] bg-[#6D28D9] px-8 py-2 font-bold text-white hover:bg-[#5B21B6]"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => onDecline(notification.id)}
            className="rounded-[60px] border border-[#6D28D9] bg-white px-8 py-2 font-bold text-[#6D28D9] hover:bg-[#F5F3FF]"
          >
            Decline
          </button>
        </div>
      )}

      {notification.status === "accepted" && (
        <span className="ml-auto font-bold text-green-600">Reserved</span>
      )}

      {notification.status === "declined" && (
        <span className="ml-auto font-bold text-[#F87171]">Declined</span>
      )}
    </div>
  )
}
