import { useSeatSelection } from '@/hooks/useSeatSelection';
import SingleSeat from './SingleSeat';

interface MapProps {
    onRoomSelect?: (isRoom: boolean) => void;
    onSeatSelect?: (hasSelected: boolean) => void;
    onOccupiedSelect?: (isOccupied: boolean) => void;
}

const T1Etaj2Map = ({ onRoomSelect, onSeatSelect, onOccupiedSelect }: MapProps) => {
    const { handleSeatClick, getSelectedState } = useSeatSelection();

    const handleSeatSelection = (id: string, type?: 'individual' | 'room') => {
        const wasSelectedBeforeClick = getSelectedState(id) === 'selected';

        const occupiedSeats = ["T1-G2-02", "T1-G2-04", "T1-G2-06"];
        const isOccupied = occupiedSeats.includes(id);

        handleSeatClick(id);

        if (onRoomSelect) {
            onRoomSelect(type === 'room');
        }

        if (onSeatSelect) {
            onSeatSelect(!wasSelectedBeforeClick);
        }

        if (onOccupiedSelect) {
            if (!wasSelectedBeforeClick) {
                onOccupiedSelect(isOccupied);
            } else {
                onOccupiedSelect(false);
            }
        }
    };

    return (
        <div className="relative mx-auto h-[700px] w-[870px] border border-gray-800 bg-[#F5F3FF] overflow-hidden shadow-sm">
            <div className="absolute top-[40px] left-[60px] text-[15px] font-semibold text-gray-800 leading-tight">
                Sala<br />Gaming<br />G2
            </div>

            <div className="absolute top-[160px] left-[20px] h-[25px] w-[25px] border border-[#7C7777] bg-[#C1BDD2]"></div>
            <div className="absolute top-[450px] left-[20px] h-[25px] w-[25px] border border-[#7C7777] bg-[#C1BDD2]"></div>

            <div className="absolute top-[240px] left-[170px] h-[45px] w-[140px] border border-[#7C7777] bg-[#C1BDD2]"></div>

            <SingleSeat id="T1-G2-01" number="1" status="available" selectedSeat={getSelectedState("T1-G2-01")} onSelect={handleSeatSelection} className="top-[170px] left-[190px]" />
            <SingleSeat id="T1-G2-02" number="2" status="occupied" selectedSeat={getSelectedState("T1-G2-02")} onSelect={handleSeatSelection} className="top-[170px] left-[250px]" />

            <SingleSeat id="T1-G2-03" number="3" status="available" selectedSeat={getSelectedState("T1-G2-03")} onSelect={handleSeatSelection} className="top-[305px] left-[190px]" />
            <SingleSeat id="T1-G2-04" number="4" status="occupied" selectedSeat={getSelectedState("T1-G2-04")} onSelect={handleSeatSelection} className="top-[305px] left-[250px]" />

            <div className="absolute top-[240px] left-[390px] h-[45px] w-[140px] border border-[#7C7777] bg-[#C1BDD2]"></div>

            <SingleSeat id="T1-G2-05" number="5" status="available" selectedSeat={getSelectedState("T1-G2-05")} onSelect={handleSeatSelection} className="top-[170px] left-[410px]" />
            <SingleSeat id="T1-G2-06" number="6" status="occupied" selectedSeat={getSelectedState("T1-G2-06")} onSelect={handleSeatSelection} className="top-[170px] left-[470px]" />

            <SingleSeat id="T1-G2-07" number="7" status="available" selectedSeat={getSelectedState("T1-G2-07")} onSelect={handleSeatSelection} className="top-[305px] left-[410px]" />
            <SingleSeat id="T1-G2-08" number="8" status="available" selectedSeat={getSelectedState("T1-G2-08")} onSelect={handleSeatSelection} className="top-[305px] left-[470px]" />

            <div className="absolute top-[40px] left-[550px] h-[130px] w-[260px] border border-[#7C7777] bg-[#C1BDD2] flex items-center justify-center">
                <span className="text-[15px] font-bold text-[#3B3259]">Masa Ping-Pong</span>
            </div>

            <div className="absolute top-[420px] left-[370px] h-[130px] w-[260px] border border-[#7C7777] bg-[#C1BDD2] flex items-center justify-center">
                <span className="text-[15px] font-bold text-[#3B3259]">Masa Biliard</span>
            </div>

            <div className="absolute top-[540px] left-[680px] h-[160px] w-[1px] bg-gray-500"></div>

            <div className="absolute top-[540px] left-[740px] h-[60px] w-[60px] rounded-full border border-[#7C7777] bg-[#C1BDD2]"></div>

            <div className="absolute top-[505px] left-[757px] h-[25px] w-[25px] border border-[#7C7777] bg-[#C1BDD2]"></div>
            <div className="absolute top-[610px] left-[757px] h-[25px] w-[25px] border border-[#7C7777] bg-[#C1BDD2]"></div>
            <div className="absolute top-[557px] left-[705px] h-[25px] w-[25px] border border-[#7C7777] bg-[#C1BDD2]"></div>
            <div className="absolute top-[557px] left-[810px] h-[25px] w-[25px] border border-[#7C7777] bg-[#C1BDD2]"></div>
        </div>
    );
};
export default T1Etaj2Map;