import { useNavigate } from 'react-router-dom';

export const seatTabs = ['Parter', 'T1,etaj 1', 'T1,etaj 2', 'T2,etaj 1', 'T2,etaj 2'] as const;

type SeatTab = typeof seatTabs[number];

type SeatsNavbarProps = {
  activeTab: SeatTab;
  setActiveTab: (tab: SeatTab) => void;
};

const SeatsNavbar = ({ activeTab, setActiveTab }: SeatsNavbarProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-[#F5F3FF] p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#29255E] hover:bg-gray-200"
          >
            &larr;
          </button>

          <div className="flex gap-2">
            {seatTabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2 border border-[#000000] text-sm font-semibold transition-all ${activeTab === tab
                  ? 'bg-[#6D28D9] text-white'
                  : 'bg-[#C4B5FD] text-[#1E1B4B] hover:bg-[#D4CBFF]'
                  }`}
              >
                {tab}
              </button>
            ))}
            <button type="button" className="ml-2 text-sm font-semibold text-gray-500 underline hover:text-gray-700">
              Legenda Culorilor
            </button>
          </div>
        </div>

        <button type="button" className="rounded-full bg-[#8B5CF6] px-8 py-3 font-semibold text-white transition-all hover:bg-[#7C3AED] hover:shadow-lg">
          Confirm your selection
        </button>
      </div>
    </div>
  );
};

export default SeatsNavbar;

