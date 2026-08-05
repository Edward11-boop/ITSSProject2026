import AIAssistant from "@/pages/AIAssistant";
import { useState } from "react";
import BookingTabs from "@/components/history/BookingTabs";
import ConfirmDeleteModal from "@/components/history/ConfirmDeleteModal";
import type { Booking, BookingTab } from "@/components/history/types";

const initialBookings: Booking[] = [
  { id: 1, title: "Rezervare 1", date: "28 Iulie 2026", seat: "Rand 3, C7", room: "Sala A", time: "09:00 - 17:00", status: "In asteptare", tab: "Viitoare" },
  { id: 2, title: "Rezervare 2", date: "30 Iulie 2026", seat: "Rand 1, C2", room: "Sala B", time: "10:00 - 18:00", status: "Confirmat", tab: "Viitoare" },
  { id: 3, title: "Rezervare 3", date: "02 August 2026", seat: "Rand 2, C5", room: "Sala A", time: "09:00 - 17:00", status: "In asteptare", tab: "Viitoare" },
  { id: 4, title: "Rezervare 4 (Finalizata)", date: "15 Iulie 2026", seat: "Rand 2, C1", room: "Sala B", time: "09:00 - 17:00", status: "Finalizat", tab: "Trecute" },
  { id: 5, title: "Rezervare 5 (Anulata)", date: "20 Iulie 2026", seat: "Rand 4, C12", room: "Sala C", time: "10:00 - 14:00", status: "Anulat", tab: "Anulate" },
];

function getStatusClassName(status: string) {
  if (status === "Confirmat") {
    return "bg-green-100 text-green-600";
  }

  if (status === "Anulat") {
    return "bg-red-100 text-red-600";
  }

  if (status === "Finalizat") {
    return "bg-gray-200 text-gray-600";
  }

  return "bg-yellow-100 text-yellow-600";
}
const History = () => {
  const [activeTab, setActiveTab] = useState<BookingTab>("Viitoare");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);
  const [bookings, setBookings] = useState(initialBookings);

  const handleDeleteClick = (id: number) => {
    setBookingToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== bookingToDelete)
    );
    setIsModalOpen(false);
    setBookingToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setBookingToDelete(null);
  };

  const displayedBookings = bookings.filter((booking) => booking.tab === activeTab);

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] bg-white">
      <div className="relative min-w-0 flex-1 p-4 sm:p-8">
        <div className="mx-auto max-w-5xl">
          <BookingTabs activeTab={activeTab} onChange={setActiveTab} />

          <div className="flex flex-col gap-6">
            {displayedBookings.length === 0 ? (
              <p className="mt-10 text-center text-gray-400">
                Nu exista rezervari in aceasta categorie.
              </p>
            ) : (
              displayedBookings.map((booking) => {
                const canEdit = booking.tab === "Viitoare" && booking.status === "In asteptare";

                return (
                  <div key={booking.id}>
                    <h4 className="mb-2 text-sm font-bold text-gray-700">{booking.title}</h4>
                    <div className="flex flex-col gap-4 rounded-2xl bg-[#F8F8FC] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EBE9FE]">
                          <span className="text-xl">S</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">Data - Scaun - Sala</p>
                          <p className="font-bold text-[#29255E]">
                            {booking.date} - {booking.seat} - {booking.room}
                          </p>
                          <p className="font-bold text-[#29255E]">{booking.time}</p>
                        </div>
                      </div>

                      <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${getStatusClassName(booking.status)}`}>
                        {booking.status}
                      </span>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={canEdit ? () => handleDeleteClick(booking.id) : undefined}
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
                );
              })
            )}
          </div>
        </div>

        <AIAssistant />
      </div>

      {isModalOpen && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default History;