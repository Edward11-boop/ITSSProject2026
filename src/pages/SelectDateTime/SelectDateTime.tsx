import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Calendar from "@/components/Calendar"

type TipRezervare = "RECURENTA" | "O_ZI"
type LocationState = { bookingType: TipRezervare }

const HOURS = Array.from({ length: 11 }, (_, i) => 8 + i)

const SelectDateTime = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null
  const bookingType = state?.bookingType ?? "O_ZI"

  const [date, setDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startHour, setStartHour] = useState(9)
  const [endHour, setEndHour] = useState(17)
  const [error, setError] = useState("")


  const handleContinue = () => {
    if (endHour <= startHour) {
      setError("Ora de sfarsit trebuie sa fie dupa ora de inceput.")
      return
    }

    if (bookingType === "RECURENTA" && endDate < date) {
      setError("Data de sfarsit trebuie sa fie dupa data de inceput.")
      return
    }

    navigate("/seats", {
      state: {
        bookingType,
        date: date.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        startHour,
        endHour,
      },
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 bg-white p-4">
      <h1 className="text-3xl font-bold text-[#29255E]">Alege data si intervalul orar</h1>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="mb-2 font-semibold text-[#29255E]">
            {bookingType === "RECURENTA" ? "Data de inceput" : "Data rezervarii"}
          </p>
          <Calendar selected={date} onSelect={setDate} />
        </div>

        {bookingType === "RECURENTA" && (
          <div>
            <p className="mb-2 font-semibold text-[#29255E]">Data de sfarsit a recurentei</p>
            <Calendar selected={endDate} onSelect={setEndDate} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex flex-col text-[#29255E]">
          Ora inceput
          <select value={startHour} onChange={(e) => setStartHour(Number(e.target.value))} className="rounded-lg border-2 border-[#DDD6FE] px-4 py-2">
            {HOURS.map((h) => <option key={h} value={h}>{h}:00</option>)}
          </select>
        </label>
        <label className="flex flex-col text-[#29255E]">
          Ora sfarsit
          <select value={endHour} onChange={(e) => setEndHour(Number(e.target.value))} className="rounded-lg border-2 border-[#DDD6FE] px-4 py-2">
            {HOURS.map((h) => <option key={h} value={h}>{h}:00</option>)}
          </select>
        </label>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleContinue}
        className="rounded-full bg-[#6D28D9] px-10 py-3 font-semibold text-white hover:bg-[#5B21B6]"
      >
        Continua
      </button>
    </div>
  )
}

export default SelectDateTime


