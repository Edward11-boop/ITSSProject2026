import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const History = () => {
    const [activeTab, setActiveTab] = useState('Viitoare');


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    const [bookings, setBookings] = useState([
        { id: 1, title: 'Rezervare 1', date: '28 Iulie 2026', seat: 'Rand 3, C7', room: 'Sala A', time: '09:00 - 17:00', status: 'In asteptare', tab: 'Viitoare' },
        { id: 2, title: 'Rezervare 2', date: '30 Iulie 2026', seat: 'Rand 1, C2', room: 'Sala B', time: '10:00 - 18:00', status: 'Confirmat', tab: 'Viitoare' },
        { id: 3, title: 'Rezervare 3', date: '02 August 2026', seat: 'Rand 2, C5', room: 'Sala A', time: '09:00 - 17:00', status: 'In asteptare', tab: 'Viitoare' },
        { id: 4, title: 'Rezervare 4 (Finalizata)', date: '15 Iulie 2026', seat: 'Rand 2, C1', room: 'Sala B', time: '09:00 - 17:00', status: 'Finalizat', tab: 'Trecute' },
        { id: 5, title: 'Rezervare 5 (Anulata)', date: '20 Iulie 2026', seat: 'Rand 4, C12', room: 'Sala C', time: '10:00 - 14:00', status: 'Anulat', tab: 'Anulate' }
    ]);


    const handleDeleteClick = (id) => {
        setBookingToDelete(id);
        setIsModalOpen(true);
    };


    const confirmDelete = () => {
        setBookings(bookings.filter(booking => booking.id !== bookingToDelete));
        setIsModalOpen(false);
        setBookingToDelete(null);
    };


    const cancelDelete = () => {
        setIsModalOpen(false);
        setBookingToDelete(null);
    };

    const displayedBookings = bookings.filter(booking => booking.tab === activeTab);

    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-white relative">

            <div className="relative flex-1 p-8">
                <div className="mx-auto max-w-5xl">

                    <div className="mb-8 flex w-full rounded-full bg-[#F3F3F9] p-1">
                        {['Viitoare', 'Trecute', 'Anulate'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 rounded-full py-3 text-sm font-semibold transition-all ${activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-6">
                        {displayedBookings.length === 0 ? (
                            <p className="mt-10 text-center text-gray-400">Nu exista rezervari in aceasta categorie.</p>
                        ) : (
                            displayedBookings.map((booking) => (
                                <div key={booking.id}>
                                    <h4 className="mb-2 text-sm font-bold text-gray-700">{booking.title}</h4>
                                    <div className="flex items-center justify-between rounded-2xl bg-[#F8F8FC] p-4 shadow-sm">

                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBE9FE]">
                                                <span className="text-xl">💺</span>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Data - Scaun - Sala</p>
                                                <p className="font-bold text-[#29255E]">{booking.date} · {booking.seat} · {booking.room}</p>
                                                <p className="font-bold text-[#29255E]">{booking.time}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${booking.status === 'Confirmat' ? 'bg-green-100 text-green-600' :
                                                booking.status === 'Anulat' ? 'bg-red-100 text-red-600' :
                                                    booking.status === 'Finalizat' ? 'bg-gray-200 text-gray-600' :
                                                        'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="flex gap-3">

                                            {(booking.tab === "Viitoare" && booking.status === "In asteptare") &&
                                                <>   
                                                   <button
                                                        onClick={() => handleDeleteClick(booking.id)}
                                                        className="rounded-full border border-red-300 px-6 py-2 text-sm font-bold text-red-400 transition hover:bg-red-50"
                                                    >
                                                        Sterge
                                                    </button>
                                                    <button className="rounded-full border border-[#6D28D9] px-6 py-2 text-sm font-bold text-[#6D28D9] transition hover:bg-purple-50">
                                                        Modifica
                                                    </button>
                                                </>
                                            }

                                            {(booking.tab !== "Viitoare" || booking.status === "Confirmat") &&
                                                <>   
                                                   <button
                                                        className="rounded-full border border-[#6B7280] px-6 py-2 text-sm font-bold text-[#6B7280] transition"
                                                    >
                                                        Sterge
                                                    </button>
                                                    <button className="rounded-full border border-[#6B7280] px-6 py-2 text-sm font-bold text-[#6B7280] transition">
                                                        Modifica
                                                    </button>
                                                </>
                                            }  
                                        </div>

                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <button className="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5CF6] text-2xl text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#7C3AED]">
                    ✦
                </button>
            </div>

            {/* Aici este fundalul întunecat și POP-UP-UL de confirmare */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#29255E]/50 backdrop-blur-sm">
                    <div className="w-[400px] rounded-3xl bg-white p-8 text-center shadow-xl">

                        {/* Iconița de Warning */}
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h3 className="mb-2 text-2xl font-bold text-[#29255E]">Esti sigur?</h3>
                        <p className="mb-8 text-sm text-gray-500">
                            Aceasta actiune va sterge definitiv rezervarea selectata.
                        </p>

                        {/* Butoanele de acțiune */}
                        <div className="flex gap-4">
                            <button
                                onClick={confirmDelete}
                                className="flex-1 rounded-full bg-[#FF6B6B] py-3 text-sm font-bold text-white transition hover:bg-red-500 shadow-sm"
                            >
                                Da, sterge
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="flex-1 rounded-full border-2 border-[#6D28D9] py-3 text-sm font-bold text-[#6D28D9] transition hover:bg-purple-50"
                            >
                                Anuleaza
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default History;