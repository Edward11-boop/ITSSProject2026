import React, { useState } from 'react';
import SingleSeat from './SingleSeat';

const T1Etaj2Map = () => {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);

    const handleSeatClick = (id: string) => {
        setActiveGroup(id);
    };

    const getSelectedState = (id: string) => {
        return activeGroup === id ? id : null;
    };



    return (
        <div className="relative mx-auto h-[700px] w-[870px] border border-gray-800 bg-white overflow-hidden shadow-sm">
            {/* ================= ZONA SALA GAMING G2 ================= */}
            <div className="absolute top-[40px] left-[60px] text-[15px] font-semibold text-gray-800 leading-tight">
                Sala<br />Gaming<br />G2
            </div>

            {/* Pătratele mici gri de pe peretele din stânga */}
            <div className="absolute top-[160px] left-[20px] h-[25px] w-[25px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[450px] left-[20px] h-[25px] w-[25px] bg-[#C4C4C4]"></div>

            {/* --- Masa Gaming 1 (Stânga) --- */}
            <div className="absolute top-[240px] left-[170px] h-[45px] w-[140px] bg-[#C4C4C4]"></div>

            <SingleSeat id="T1-G2-01" type="room" number="1" status="available" selectedSeat={getSelectedState("T1-G2-01")} onSelect={handleSeatClick} className="top-[170px] left-[190px]" />
            <SingleSeat id="T1-G2-02" type="room" number="2" status="occupied" selectedSeat={getSelectedState("T1-G2-02")} onSelect={handleSeatClick} className="top-[170px] left-[250px]" />

            <SingleSeat id="T1-G2-03" type="room" number="3" status="available" selectedSeat={getSelectedState("T1-G2-03")} onSelect={handleSeatClick} className="top-[305px] left-[190px]" />
            <SingleSeat id="T1-G2-04" type="room" number="4" status="occupied" selectedSeat={getSelectedState("T1-G2-04")} onSelect={handleSeatClick} className="top-[305px] left-[250px]" />


            {/* --- Masa Gaming 2 (Dreapta) --- */}
            <div className="absolute top-[240px] left-[390px] h-[45px] w-[140px] bg-[#C4C4C4]"></div>

            <SingleSeat id="T1-G2-05" type="room" number="5" status="available" selectedSeat={getSelectedState("T1-G2-05")} onSelect={handleSeatClick} className="top-[170px] left-[410px]" />
            <SingleSeat id="T1-G2-06" type="room" number="6" status="occupied" selectedSeat={getSelectedState("T1-G2-06")} onSelect={handleSeatClick} className="top-[170px] left-[470px]" />

            <SingleSeat id="T1-G2-07" type="room" number="7" status="available" selectedSeat={getSelectedState("T1-G2-07")} onSelect={handleSeatClick} className="top-[305px] left-[410px]" />
            <SingleSeat id="T1-G2-08" type="room" number="8" status="available" selectedSeat={getSelectedState("T1-G2-08")} onSelect={handleSeatClick} className="top-[305px] left-[470px]" />


            {/* ================= ZONA MASA PING-PONG ================= */}
            <div className="absolute top-[40px] left-[550px] h-[130px] w-[260px] bg-[#C4C4C4] flex items-center justify-center">
                <span className="text-[15px] font-bold text-[#3B3259]">Masa Ping-Pong</span>
            </div>


            {/* ================= ZONA MASA BILIARD ================= */}
            <div className="absolute top-[420px] left-[370px] h-[130px] w-[260px] bg-[#C4C4C4] flex items-center justify-center">
                <span className="text-[15px] font-bold text-[#3B3259]">Masa Biliard</span>
            </div>


            {/* ================= ZONA MASA ROTUNDĂ (DREAPTA JOS) ================= */}
            {/* Peretele despărțitor */}
            <div className="absolute top-[540px] left-[680px] h-[160px] w-[1px] bg-gray-500"></div>


            <div className="absolute top-[540px] left-[740px] h-[60px] w-[60px] rounded-full bg-[#C4C4C4]"></div>


            <div className="absolute top-[505px] left-[757px] h-[25px] w-[25px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[610px] left-[757px] h-[25px] w-[25px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[557px] left-[705px] h-[25px] w-[25px] bg-[#C4C4C4]"></div>
            <div className="absolute top-[557px] left-[810px] h-[25px] w-[25px] bg-[#C4C4C4]"></div>

        </div>
    );

};
export default T1Etaj2Map;