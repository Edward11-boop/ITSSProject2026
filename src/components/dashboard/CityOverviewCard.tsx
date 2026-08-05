import {
  CloudRain,
  Droplets,
  Wind,
} from "lucide-react"

import {
  trafficMock,
  weatherMock,
} from "@/data/dashboardMockData"

const CityOverviewCard = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Weather */}
      <section className="rounded-xl bg-[#F5F3FF] p-5">
        <h3 className="font-bold text-[#29255E]">
          Weather — {weatherMock.city}
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          {weatherMock.date}
        </p>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
              <CloudRain className="h-7 w-7" />
            </div>

            <div>
              <p className="text-3xl font-bold text-[#29255E]">
                {weatherMock.temperature}°C
              </p>

              <p className="text-sm text-gray-500">
                {weatherMock.condition}
              </p>
            </div>
          </div>

          <div className="flex gap-7 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />

              <span>
                Humidity: {weatherMock.humidity}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4" />

              <span>
                Wind: {weatherMock.windSpeed} km/h
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Traffic */}
      <section className="min-h-[280px] flex-1 rounded-xl bg-[#F5F3FF] p-5">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-[#29255E]">
            Traffic — Bucharest
          </h3>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
            Live
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {trafficMock.map((trafficItem) => (
            <div
              key={trafficItem.id}
              className="grid grid-cols-[16px_1fr] gap-2 sm:grid-cols-[16px_150px_1fr]"
            >
              <span
                className="mt-1 h-3 w-3 rounded-full"
                style={{
                  backgroundColor: trafficItem.color,
                }}
              />

              <span className="text-sm font-medium text-[#29255E]">
                {trafficItem.location}
              </span>

              <span className="col-start-2 text-xs text-gray-400 sm:col-start-auto">
                {trafficItem.level}

                {trafficItem.interval && (
                  <> · {trafficItem.interval}</>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CityOverviewCard