import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParterMap from '@/components/maps/ParterMap';
import SeatsNavbar from '@/components/maps/SeatsNavbar';

const Seats = () => {
  const [activeTab, setActiveTab] = useState('Parter');

  return (
    <div>
      <SeatsNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Parter' && <ParterMap />}

      {activeTab !== 'Parter' && (
        <div>Harta pentru {activeTab} este in lucru...</div>
      )}
    </div>
  );
};

export default Seats;