import React from 'react';
import { useNavigate } from 'react-router-dom';

const TypeOfReservation = () => {
    const navigate = useNavigate();

    return (

        <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center bg-white">

            {/* Titlul paginii */}
            <h1 className="mb-16 text-4xl font-bold text-[#29255E]">
                Tipul rezervarii
            </h1>

            {/* Containerul pentru cele două butoane */}
            <div className="flex gap-8">

                <button

                    className="rounded-[3rem] bg-[#F4F3FF] px-14 py-8 text-xl font-bold text-[#29255E] transition-all hover:scale-105 hover:bg-[#EBE9FE] hover:shadow-md"
                >
                    Rezervare recurenta
                </button>

                <button

                    className="rounded-[3rem] bg-[#F4F3FF] px-14 py-8 text-xl font-bold text-[#29255E] transition-all hover:scale-105 hover:bg-[#EBE9FE] hover:shadow-md"
                >
                    Rezervare o singura zi
                </button>

            </div>

        </div>
    );
};

export default TypeOfReservation;