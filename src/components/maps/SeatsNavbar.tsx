import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParterMap from '@/components/maps/ParterMap';

type SeatsNavbarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Seats = ( {activeTab, setActiveTab }: SeatsNavbarProps ) => {
  const tabs = ['Parter', 'T1,etaj 1', 'T1,etaj 2', 'T2,etaj 1', 'T2,etaj 2'];
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-[#F8F9FA] p-8">

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#29255E] hover:bg-gray-200"
          >
            ←
          </button>

          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${activeTab === tab
                  ? 'bg-[#8B5CF6] text-white'
                  : 'bg-[#E5E0FF] text-[#29255E] hover:bg-[#D4CBFF]'
                  }`}
              >
                {tab}
              </button>
            ))}
            <button className="ml-2 text-sm font-semibold text-gray-500 underline hover:text-gray-700">
              Legenda Culorilor
            </button>
          </div>
        </div>

        <button className="rounded-full bg-[#8B5CF6] px-8 py-3 font-bold text-white transition-all hover:bg-[#7C3AED] hover:shadow-lg">
          Confirm your selection
        </button>
      </div>

    </div>
  );
};

export default Seats;