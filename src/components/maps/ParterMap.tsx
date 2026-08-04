import React, { useState } from 'react';

interface SeatProps {
    id: string;
    number: string | number;
    status: 'available' | 'occupied' | 'unavailable';
    type?: 'individual' | 'room';
}

const ParterMap = () => {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    const getSeatColor = (id: string, status: string, type: string) => {
        if (selectedSeat === id) return 'bg-[#8B5CF6] text-white';

        switch (status) {
            case 'available':
                return type === 'room' ? 'bg-[#5EEAD4] text-[#134E4A]' : 'bg-[#A7F3D0] text-[#064E3B]';
            case 'occupied':
                return 'bg-[#FECACA] text-[#7F1D1D]';
            case 'unavailable':
                return 'bg-[#D1D5DB] text-gray-500 cursor-not-allowed';
            default:
                return 'bg-gray-200';
        }
    };

    // Componenta pentru un singur loc
    const Seat: React.FC<SeatProps & { className?: string }> = ({ id, number, status, type = 'individual', className = '' }) => {
        const isClickable = status === 'available';

        return (
            <div className={`absolute group ${className}`}>
                <button
                    disabled={!isClickable}
                    onClick={() => setSelectedSeat(id)}
                    className={`flex h-[30px] w-[30px] items-center justify-center rounded text-xs font-bold transition-all ${getSeatColor(id, status, type)} ${isClickable ? 'hover:scale-110 hover:shadow-md z-20' : ''}`}
                >
                    {number}
                </button>

                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#29255E] px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-30">
                    ID: {id}
                </div>
            </div>
        );
    };

    return (
        // Containerul principal al hartii (Fixat proportional pentru a pastra design-ul)
        <div className="relative mx-auto h-[650px] w-full max-w-[1000px] border border-gray-800 bg-white overflow-hidden shadow-sm">

            {/* ----------------- PERETII (Liniile despartitoare subtiri) ----------------- */}

            {/* Perete despartitor S0 (Stanga si Jos) */}
            <div className="absolute top-0 right-[350px] h-[250px] w-[1px] bg-gray-800"></div>
            <div className="absolute top-[250px] right-0 w-[350px] h-[1px] bg-gray-800"></div>

            {/* Perete despartitor Bucatarie (Sus) */}
            <div className="absolute bottom-[120px] right-0 w-[350px] h-[1px] bg-gray-800"></div>

            {/* Liniile labirintului din stanga jos */}
            <div className="absolute top-[420px] left-0 w-[280px] h-[1px] bg-gray-800"></div>
            <div className="absolute top-[420px] left-[280px] w-[1px] h-[230px] bg-gray-800"></div>
            <div className="absolute top-[550px] left-[280px] w-[80px] h-[1px] bg-gray-800"></div>


            {/* ----------------- ZONA 1: STAND-UP DESKS (SD0) ----------------- */}
            <div className="absolute left-6 top-6">
                <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-4">Zona Stand-Up<br />Desks , SD0</h3>

                {/* Biroul 1 (Sus) */}
                <div className="absolute top-[40px] left-[10px] h-[50px] w-[150px] bg-[#C4C4C4]"></div>
                <Seat id="P-SD0-01" number="1" status="available" className="top-[5px] left-[30px]" />
                <Seat id="P-SD0-02" number="2" status="available" className="top-[5px] left-[100px]" />
                <Seat id="P-SD0-03" number="3" status="available" className="top-[95px] left-[30px]" />
                <Seat id="P-SD0-04" number="4" status="occupied" className="top-[95px] left-[100px]" />

                {/* Biroul 2 (Jos) */}
                <div className="absolute top-[180px] left-[10px] h-[50px] w-[150px] bg-[#C4C4C4]"></div>
                <Seat id="P-SD0-05" number="5" status="occupied" className="top-[145px] left-[30px]" />
                <Seat id="P-SD0-06" number="6" status="available" className="top-[145px] left-[100px]" />
                <Seat id="P-SD0-07" number="7" status="occupied" className="top-[235px] left-[30px]" />
                <Seat id="P-SD0-08" number="8" status="occupied" className="top-[235px] left-[100px]" />
            </div>


            {/* ----------------- ZONA 2: DECORATIUNI CENTRU-SUS ----------------- */}
            {/* Dreptunghiuri lipite de tavan */}
            <div className="absolute top-0 left-[350px] h-[25px] w-[140px] bg-[#C4C4C4]"></div>
            <div className="absolute top-0 left-[510px] h-[25px] w-[60px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[30px] left-[570px] h-[50px] w-[20px] bg-[#C4C4C4]"></div>

            {/* Cerc si patratele decorative */}
            <div className="absolute top-[90px] left-[480px] h-[60px] w-[60px] rounded-full bg-[#C4C4C4]"></div>
            <div className="absolute top-[105px] left-[420px] h-[30px] w-[30px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[165px] left-[450px] h-[30px] w-[30px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[165px] left-[540px] h-[30px] w-[30px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[105px] left-[570px] h-[25px] w-[20px] bg-[#C4C4C4]"></div>


            {/* ----------------- ZONA 3: DECORATIUNI STANGA-JOS ----------------- */}
            <div className="absolute top-[440px] left-[310px] h-[30px] w-[30px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[490px] left-[290px] h-[30px] w-[30px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[565px] left-[310px] h-[30px] w-[30px] bg-[#C4C4C4]"></div>


            {/* ----------------- ZONA 4: SALA SEDINTE (S0) ----------------- */}
            <div className="absolute top-0 right-0 w-[350px] h-[250px] p-4">
                <h3 className="text-sm font-semibold text-gray-800 leading-tight">Sala<br />sedinte<br />S0</h3>

                {/* Masa L-Shape */}
                <div className="absolute top-[50px] left-[70px] h-[45px] w-[200px] bg-[#C4C4C4]"></div>
                <div className="absolute top-[95px] left-[225px] h-[75px] w-[45px] bg-[#C4C4C4]"></div>

                {/* Scaune S0 (Selectare Integrala) */}
                <Seat id="P-S0" number="1" status="available" type="room" className="top-[15px] left-[80px]" />
                <Seat id="P-S0" number="2" status="available" type="room" className="top-[15px] left-[125px]" />
                <Seat id="P-S0" number="3" status="available" type="room" className="top-[15px] left-[170px]" />

                <Seat id="P-S0" number="4" status="available" type="room" className="top-[45px] left-[280px]" />
                <Seat id="P-S0" number="5" status="available" type="room" className="top-[90px] left-[280px]" />
                <Seat id="P-S0" number="6" status="available" type="room" className="top-[135px] left-[280px]" />

                <Seat id="P-S0" number="8" status="available" type="room" className="top-[140px] left-[110px]" />
                <Seat id="P-S0" number="7" status="available" type="room" className="top-[140px] left-[160px]" />
            </div>


            {/* ----------------- ZONA 5: SALA BIROURI (B0) ----------------- */}
            <div className="absolute top-[250px] right-0 w-[350px] h-[280px]">
                <h3 className="absolute top-[60px] right-[20px] text-sm font-semibold text-gray-800 leading-tight">Sala<br />birouri<br />B0</h3>

                {/* Biroul Vertical 1 (Stanga) */}
                <div className="absolute top-[20px] left-[60px] h-[240px] w-[35px] bg-[#C4C4C4]"></div>

                {/* Locurile 1-6 */}
                <Seat id="P-B0-01" number="1" status="available" className="top-[25px] left-[20px]" />
                <Seat id="P-B0-02" number="2" status="available" className="top-[60px] left-[20px]" />
                <Seat id="P-B0-03" number="3" status="available" className="top-[95px] left-[20px]" />
                <Seat id="P-B0-04" number="4" status="occupied" className="top-[130px] left-[20px]" />
                <Seat id="P-B0-05" number="5" status="available" className="top-[165px] left-[20px]" />
                <Seat id="P-B0-06" number="6" status="occupied" className="top-[200px] left-[20px]" />

                {/* Biroul Vertical 2 (Mijloc) */}
                <div className="absolute top-[20px] left-[165px] h-[240px] w-[35px] bg-[#C4C4C4]"></div>

                {/* Locurile 7-12 */}
                <Seat id="P-B0-07" number="7" status="available" className="top-[25px] left-[125px]" />
                <Seat id="P-B0-08" number="8" status="occupied" className="top-[60px] left-[125px]" />
                <Seat id="P-B0-09" number="9" status="occupied" className="top-[95px] left-[125px]" />
                <Seat id="P-B0-10" number="10" status="available" className="top-[130px] left-[125px]" />
                <Seat id="P-B0-11" number="11" status="available" className="top-[165px] left-[125px]" />
                <Seat id="P-B0-12" number="12" status="available" className="top-[200px] left-[125px]" />
            </div>


            {/* ----------------- ZONA 6: BUCATARIE ----------------- */}
            <div className="absolute bottom-0 right-0 w-[350px] h-[120px] flex items-center justify-center bg-[#F8F9FA]/50">
                <h3 className="text-sm font-semibold text-gray-800">Bucatarie</h3>
            </div>

        </div>
    );
};

export default ParterMap;