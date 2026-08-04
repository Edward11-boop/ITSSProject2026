import { useState } from 'react';
import ParterMap from '@/components/maps/ParterMap';
import SeatsNavbar from '@/components/maps/SeatsNavbar';

const Seats = () => {
  const [activeTab, setActiveTab] = useState('Parter');

  return (
    <div className="bg-[#F5F3FF]">
      <SeatsNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Parter' && <ParterMap />}

      {activeTab !== 'Parter' && (
        <div>Harta pentru {activeTab} este in lucru...</div>
      )}
    </div>
  );
};

export default Seats;
