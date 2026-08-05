import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        Office Seat Booking
      </h1>
      <p className="mb-8 text-slate-500">
        Reserve your spot in the office for the day.
      </p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Today's availability
          </h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            12 / 20 free
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <p className="text-sm text-slate-500">
            Pick a seat from the map and book it with your name.
          </p>
          <button
            type="button"
            onClick={() => navigate("/seats")}
            className="w-fit rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            View seat map
          </button>
        </div>
      </div>
    </div>
  )
}