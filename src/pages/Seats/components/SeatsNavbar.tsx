import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import singleSeatAvailable from '@/assets/singleSeatAvailable.svg';
import selected from '@/assets/selected.svg';
import occupied from '@/assets/occupied.svg';
import indisponibil from '@/assets/indisponibil.svg';
import roomAvailable from '@/assets/roomAvailable.svg';

import SuccessPopUp from '@/components/SuccessPopUp';
import ErrorPopUp from '@/components/ErrorPopUp';

export const seatTabs = ['Parter', 'T1,etaj 1', 'T1,etaj 2', 'T2,etaj 1', 'T2,etaj 2'] as const;

type SeatTab = typeof seatTabs[number];

type SeatsNavbarProps = {
  activeTab: SeatTab;
  setActiveTab: (tab: SeatTab) => void;
  isRoomSelected: boolean;
};

const SeatsNavbar = ({ activeTab, setActiveTab, isRoomSelected }: SeatsNavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [popupState, setPopupState] = useState<'none' | 'success-admin' | 'success-direct' | 'error-taken' | 'error-admin-fail' | 'error-unavailable'>('none');

  const handleConfirmSelection = () => {
    const bookingType = location.state?.bookingType;
    const esteSala = isRoomSelected;


    const eroareServerLocOcupat = false;
    const eroareServerAdminFail = false;
    const eroareLocIndisponibil = false;

    if (eroareServerLocOcupat) {
      setPopupState('error-taken');
    }
    else if (eroareServerAdminFail) {
      setPopupState('error-admin-fail');
    }
    else if (eroareLocIndisponibil) {
      setPopupState('error-unavailable');
    }
    else if (bookingType === 'RECURENTA' || esteSala) {
      setPopupState('success-admin');
    }
    else if (bookingType === 'O_ZI' && !esteSala) {
      setPopupState('success-direct');
    }
    else {
      navigate('/type-of-reservation');
    }
  };

  return (
    <>
      <div className="flex h-full flex-col bg-[#F5F3FF] p-4 sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#29255E] hover:bg-gray-200"
            >
              &larr;
            </button>

            <div className="flex min-w-0 flex-wrap gap-2">
              {seatTabs.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border border-[#000000] px-4 py-2 text-sm font-semibold transition-all sm:px-6 ${activeTab === tab
                    ? 'bg-[#6D28D9] text-white'
                    : 'bg-[#C4B5FD] text-[#1E1B4B] hover:bg-[#D4CBFF]'
                    }`}
                >
                  {tab}
                </button>
              ))}

              <div className="group relative">
                <button type="button" className="ml-2 text-sm font-semibold text-gray-500 underline hover:text-gray-700">
                  Legenda Culorilor
                </button>

                <div className="absolute right-0 top-full z-50 hidden pt-2 group-hover:flex">
                  <div className="flex w-48 flex-col gap-3 rounded-lg border border-[#C4B5FD] bg-[#EDE9FE] p-3 shadow-lg">
                    <div className="flex items-center gap-3 text-sm font-semibold text-[#1E1B4B]">
                      <img src={singleSeatAvailable} alt="single seat available" className="h-6 w-6" />
                      <p>Disponibil (loc individual)</p>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-[#1E1B4B]">
                      <img src={occupied} alt="occupied" className="h-6 w-6" />
                      <p>Ocupat</p>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-[#1E1B4B]">
                      <img src={selected} alt="selected" className="h-6 w-6" />
                      <p>Selectat</p>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-[#1E1B4B]">
                      <img src={indisponibil} alt="indisponibil" className="h-6 w-6" />
                      <p>Indisponibil</p>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-[#1E1B4B]">
                      <img src={roomAvailable} alt="room available" className="h-6 w-6" />
                      <p>Disponibil (doar daca se rezerva toata sala)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmSelection}
            className="rounded-full bg-[#8B5CF6] px-5 py-3 font-semibold text-white transition-all hover:bg-[#7C3AED] hover:shadow-lg sm:px-8"
          >
            Confirm new selection
          </button>
        </div>
      </div>

      {popupState === 'success-admin' && (
        <SuccessPopUp
          title="Cererea a fost trimisă către administrator. Se așteaptă răspunsul..."
          sideMessage="Cererea a fost trimisă către administrator"
          highlightedText="CU SUCCES"
          onClose={() => setPopupState('none')}
        />
      )}

      {popupState === 'success-direct' && (
        <SuccessPopUp
          title="Rezervare efectuata cu succes. O puteti vizualiza in “Rezervarile mele”"
          sideMessage="Cererea a fost efectuata"
          highlightedText="CU SUCCES"
          onClose={() => setPopupState('none')}
        />
      )}

      {popupState === 'error-taken' && (
        <ErrorPopUp
          title="Acest loc este deja rezervat."
          message="Vă rugăm să alegeți alt loc."
          sideMessage="Loc ocupat"
          buttonText="Inapoi la harta interactiva"
          onClose={() => setPopupState('none')}
        />
      )}

      {popupState === 'error-admin-fail' && (
        <ErrorPopUp
          title="Cererea nu s-a putut trimite catre administrator."
          message="Te rugam sa incerci din nou mai tarziu."
          sideMessage="Eroare trimitere cerere"
          buttonText="OK, am inteles"
          onClose={() => setPopupState('none')}
        />
      )}

      {popupState === 'error-unavailable' && (
        <ErrorPopUp
          title="Ai ales un loc indisponibil. Te rugam sa selectezi alt loc."
          message="Acest loc nu poate fi rezervat in acest moment."
          sideMessage="Loc indisponibil"
          buttonText="OK, am inteles"
          onClose={() => setPopupState('none')}
        />
      )}
    </>
  );
};

export default SeatsNavbar;