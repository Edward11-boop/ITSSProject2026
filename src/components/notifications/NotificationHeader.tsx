import { Bell } from "lucide-react"

export default function NotificationHeader() {
  return (
    <div className="flex w-fit items-center gap-3 rounded-[60px] border border-[#DDD6FE] bg-[#EDE9FE] px-6 py-3 shadow-sm">
      <h4 className="text-base font-bold text-[#29255E] sm:text-xl">Notifications</h4>
      <Bell />
    </div>
  )
}