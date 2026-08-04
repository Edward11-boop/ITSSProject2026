import { useState } from 'react';
import ParterMap from '@/components/maps/ParterMap';
import SeatsNavbar, { seatTabs } from '@/components/maps/SeatsNavbar';
import T1Etaj1Map from '@/components/maps/T1Etaj1Map';
import T2Etaj1Map from '@/components/maps/T2Etaj1Map';
import T1Etaj2Map from '@/components/maps/T1Etaj2Map';
import FloatingIcon from '@/components/AIAssistant/FloatingIcon';
import AIAssistant from './AIAssistant';

const mapByTab = {
  Parter: <ParterMap />,
  'T1,etaj 1': <T1Etaj1Map />,
  'T2,etaj 1': <T2Etaj1Map />,
  'T1,etaj 2': <T1Etaj2Map />
} as const;

type SeatTab = typeof seatTabs[number];

const Seats = () => {
  const [activeTab, setActiveTab] = useState<SeatTab>('Parter');

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      <SeatsNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab in mapByTab ? mapByTab[activeTab as keyof typeof mapByTab] : (
        <div className="flex h-full items-center justify-center text-gray-400">
          Harta pentru {activeTab} este in lucru...
        </div>
      )}

      <AIAssistant/>
    </div>
  );
};

export default Seats;


