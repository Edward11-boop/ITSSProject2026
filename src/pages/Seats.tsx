import { useState } from 'react';
import ParterMap from '@/components/maps/ParterMap';
import SeatsNavbar from '@/components/maps/SeatsNavbar';
import T1Etaj1Map from '@/components/maps/T1Etaj1Map';

const Seats = () => {
  const [activeTab, setActiveTab] = useState('Parter');

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      <SeatsNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Parter' && <ParterMap />}
      {activeTab === 'T1,etaj 1' && <T1Etaj1Map />}

      {activeTab !== 'Parter' && activeTab !== 'T1,etaj 1' && (
        <div className="flex h-full items-center justify-center text-gray-400">
          Harta pentru {activeTab} este in lucru...
        </div>
      )}
    </div>
  );
};

export default Seats;
