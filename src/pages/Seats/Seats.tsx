import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import ParterMap from './components/ParterMap';
import SeatsNavbar, { seatTabs } from './components/SeatsNavbar';
import T1Etaj1Map from './components/T1Etaj1Map';
import T2Etaj1Map from './components/T2Etaj1Map';
import T1Etaj2Map from './components/T1Etaj2Map';
import AIAssistant from '@/pages/AIAssistant';
import T2Etaj2Map from './components/T2Etaj2Map';

type MapConfig = {
  element: ReactNode;
  width: number;
  height: number;
};

const mapByTab = {
  Parter: { element: <ParterMap />, width: 1000, height: 650 },
  'T1,etaj 1': { element: <T1Etaj1Map />, width: 870, height: 700 },
  'T2,etaj 1': { element: <T2Etaj1Map />, width: 1000, height: 650 },
  'T1,etaj 2': { element: <T1Etaj2Map />, width: 870, height: 700 },
  'T2,etaj 2': { element: <T2Etaj2Map />, width: 1000, height: 620 },
} as const;

type SeatTab = typeof seatTabs[number];

const ResponsiveMap = ({ element, width, height }: MapConfig) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => {
      const shouldUseScroll = window.innerWidth < 1024 && wrapper.clientWidth < width;
      setScale(shouldUseScroll ? 1 : Math.min(1, wrapper.clientWidth / width));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={wrapperRef} className="w-full overflow-x-auto overflow-y-hidden px-2 pb-8 sm:px-4 lg:overflow-x-hidden">
      <div className="mx-auto" style={{ width: width * scale, height: height * scale }}>
        <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {element}
        </div>
      </div>
    </div>
  );
};

const Seats = () => {
  const [activeTab, setActiveTab] = useState<SeatTab>('Parter');
  const activeMap = mapByTab[activeTab as keyof typeof mapByTab];

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      <SeatsNavbar activeTab={activeTab} setActiveTab={setActiveTab} />


      {activeMap ? (
        <ResponsiveMap {...activeMap} />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-400">
          Harta pentru {activeTab} este in lucru...
        </div>
      )}

      <AIAssistant />
    </div>
  );
};

export default Seats;

