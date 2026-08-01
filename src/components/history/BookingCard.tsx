import type { Booking } from "./types"

type BookingCardProps = {
  booking: Booking
  onDelete: (id: number) => void
}

function getStatusClassName(status: string) {
  if (status === "Confirmat") {
    return "bg-green-100 text-green-600"
  }

  if (status === "Anulat") {
    return "bg-red-100 text-red-600"
  }

  if (status === "Finalizat") {
    return "bg-gray-200 text-gray-600"
  }

  return "bg-yellow-100 text-yellow-600"
}

export default function BookingCard({ booking, onDelete }: BookingCardProps) {
  const canEdit = booking.tab === "Viitoare" && booking.status === "In asteptare"

  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-gray-700">{booking.title}</h4>
      <div className="flex items-center justify-between rounded-2xl bg-[#F8F8FC] p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBE9FE]">
            <span className="text-xl">S</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Data - Scaun - Sala</p>
            <p className="font-bold text-[#29255E]">
              {booking.date} - {booking.seat} - {booking.room}
            </p>
            <p className="font-bold text-[#29255E]">{booking.time}</p>
          </div>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClassName(booking.status)}`}>
          {booking.status}
        </span>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={canEdit ? () => onDelete(booking.id) : undefined}
            className={
              canEdit
                ? "rounded-full border border-[#F87171] bg-[#FEE2E2] px-6 py-2 text-sm font-bold text-red-400 transition hover:bg-red-50"
                : "rounded-full border border-[#6B7280] px-6 py-2 text-sm font-bold text-[#6B7280] transition"
            }
          >
            Sterge
          </button>
          <button
            type="button"
            className={
              canEdit
                ? "rounded-full border border-[#6D28D9] px-6 py-2 text-sm font-bold text-[#6D28D9] transition hover:bg-purple-50"
                : "rounded-full border border-[#6B7280] px-6 py-2 text-sm font-bold text-[#6B7280] transition"
            }
          >
            Modifica
          </button>
        </div>
      </div>
    </div>
  )
}
