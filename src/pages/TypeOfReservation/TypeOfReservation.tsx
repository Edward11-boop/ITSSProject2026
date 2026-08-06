import { useNavigate } from "react-router-dom";
import AIAssistant from "@/pages/AIAssistant";

const reservationTypes = [
  { label: "Rezervare recurenta", bookingType: "RECURENTA" },
  { label: "Rezervare o singura zi", bookingType: "O_ZI" },
] as const;

const TypeOfReservation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-white p-4">
      <h1 className="mb-10 text-center text-3xl font-bold text-[#29255E] sm:mb-16 sm:text-4xl">
        Tipul rezervarii
      </h1>

      <div className="flex items-center w-full max-w-3xl flex-col gap-4 sm:flex-row sm:gap-8">
        {reservationTypes.map((reservationType) => (
          <button
            key={reservationType.bookingType}
            type="button"
            onClick={() => navigate("/select-date", { state: { bookingType: reservationType.bookingType } })}
            className="rounded-[3rem] border-b border-[#DDD6FE] bg-[#EDE9FE] px-8 py-6 text-lg font-bold text-[#29255E] transition-all hover:scale-105 hover:bg-[#EBE9FE] hover:shadow-md sm:px-14 sm:py-8 sm:text-xl"
          >
            {reservationType.label}
          </button>
        ))}
      </div>

      <AIAssistant />
    </div>
  );
};

export default TypeOfReservation;