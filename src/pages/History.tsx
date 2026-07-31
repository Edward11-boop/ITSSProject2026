import { useState } from "react"
import BookingCard from "@/components/history/BookingCard"
import BookingTabs from "@/components/history/BookingTabs"
import ConfirmDeleteModal from "@/components/history/ConfirmDeleteModal"
import type { Booking, BookingTab } from "@/components/history/types"

const initialBookings: Booking[] = [
  { id: 1, title: "Rezervare 1", date: "28 Iulie 2026", seat: "Rand 3, C7", room: "Sala A", time: "09:00 - 17:00", status: "In asteptare", tab: "Viitoare" },
  { id: 2, title: "Rezervare 2", date: "30 Iulie 2026", seat: "Rand 1, C2", room: "Sala B", time: "10:00 - 18:00", status: "Confirmat", tab: "Viitoare" },
  { id: 3, title: "Rezervare 3", date: "02 August 2026", seat: "Rand 2, C5", room: "Sala A", time: "09:00 - 17:00", status: "In asteptare", tab: "Viitoare" },
  { id: 4, title: "Rezervare 4 (Finalizata)", date: "15 Iulie 2026", seat: "Rand 2, C1", room: "Sala B", time: "09:00 - 17:00", status: "Finalizat", tab: "Trecute" },
  { id: 5, title: "Rezervare 5 (Anulata)", date: "20 Iulie 2026", seat: "Rand 4, C12", room: "Sala C", time: "10:00 - 14:00", status: "Anulat", tab: "Anulate" },
]

const History = () => {
  const [activeTab, setActiveTab] = useState<BookingTab>("Viitoare")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null)
  const [bookings, setBookings] = useState(initialBookings)

  const handleDeleteClick = (id: number) => {
    setBookingToDelete(id)
    setIsModalOpen(true)
  }

  const confirmDelete = () => {
    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== bookingToDelete),
    )
    setIsModalOpen(false)
    setBookingToDelete(null)
  }

  const cancelDelete = () => {
    setIsModalOpen(false)
    setBookingToDelete(null)
  }

  const displayedBookings = bookings.filter((booking) => booking.tab === activeTab)

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] bg-white">
      <div className="relative flex-1 p-8">
        <div className="mx-auto max-w-5xl">
          <BookingTabs activeTab={activeTab} onChange={setActiveTab} />

          <div className="flex flex-col gap-6">
            {displayedBookings.length === 0 ? (
              <p className="mt-10 text-center text-gray-400">
                Nu exista rezervari in aceasta categorie.
              </p>
            ) : (
              displayedBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </div>
        </div>

        <button className="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5CF6] text-2xl text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#7C3AED]">
          +
        </button>
      </div>

      {isModalOpen && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  )
}

export default History
