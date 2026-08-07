import { useEffect, useMemo, useState } from "react"
import DashboardCard from "./DashboardCard"
import {
  CloudRain,
  Droplets,
  Wind,
} from "lucide-react"

import {
  trafficMock,
  weatherMock,
} from "@/data/dashboardMockData"

type WeatherApiResponse = {
  temperature?: number
  windSpeed?: number
  precipitation?: number
  snowfall?: number
  weatherCode?: number
  humidity?: number
}

type RouteApiResponse = {
  routeName: string
  distanceInMeters: number
  durationInSeconds: number
}

type WeatherView = {
  city: string
  date: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

const bucharestFallbackLocation = {
  latitude: 44.4268,
  longitude: 26.1025,
}

const formatLocalDateTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0")

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const getTargetHour = () => {
  const now = new Date()
  now.setMinutes(0, 0, 0)
  now.setHours(now.getHours() + 1)

  return formatLocalDateTime(now)
}

const getWeatherCondition = (weatherCode?: number) => {
  if (weatherCode === undefined) {
    return weatherMock.condition
  }

  if (weatherCode === 0) {
    return "Clear"
  }

  if (weatherCode <= 2) {
    return "Mostly clear"
  }

  if (weatherCode === 3) {
    return "Overcast"
  }

  if (weatherCode >= 51 && weatherCode <= 67) {
    return "Rainy"
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return "Snowy"
  }

  if (weatherCode >= 80 && weatherCode <= 82) {
    return "Showers"
  }

  if (weatherCode >= 95) {
    return "Storm"
  }

  return "Cloudy"
}

const formatMinutes = (seconds: number) => `${Math.max(1, Math.round(seconds / 60))} min`

const formatDistance = (meters: number) => `${(meters / 1000).toFixed(1)} km`

const getTrafficColor = (durationInSeconds: number, distanceInMeters: number) => {
  const distanceKm = distanceInMeters / 1000
  const durationMinutes = durationInSeconds / 60
  const minutesPerKm = durationMinutes / Math.max(distanceKm, 0.1)

  if (minutesPerKm >= 4) {
    return "#EF4444"
  }

  if (minutesPerKm >= 2.5) {
    return "#F59E0B"
  }

  return "#10B981"
}

const estimateTravelTimes = (distanceInMeters: number) => {
  const distanceKm = distanceInMeters / 1000

  return {
    walking: `${Math.round((distanceKm / 5) * 60)} min`,
    bicycling: `${Math.round((distanceKm / 15) * 60)} min`,
    transit: `${Math.round((distanceKm / 12) * 60 + 8)} min`,
  }
}

const CityOverviewCard = () => {
  const [weather, setWeather] = useState<WeatherView>({
    city: weatherMock.city,
    date: weatherMock.date,
    temperature: weatherMock.temperature,
    condition: weatherMock.condition,
    humidity: weatherMock.humidity,
    windSpeed: weatherMock.windSpeed,
  })
  const [routes, setRoutes] = useState<RouteApiResponse[]>([])

  const fallbackTrafficRoutes = useMemo(
    () => trafficMock.map((trafficItem) => ({
      routeName: trafficItem.location,
      distanceInMeters: 0,
      durationInSeconds: 0,
    })),
    [],
  )

  useEffect(() => {
    const loadCityOverview = async (coords = bucharestFallbackLocation) => {
      const targetHour = getTargetHour()

      try {
        const weatherParams = new URLSearchParams({
          latitude: String(coords.latitude),
          longitude: String(coords.longitude),
          targetHour,
        })
        const trafficParams = new URLSearchParams({
          lat: String(coords.latitude),
          lng: String(coords.longitude),
          metodaDeplasare: "DRIVE",
        })

        const [weatherResponse, trafficResponse] = await Promise.all([
          fetch(`http://localhost:8080/weather-test?${weatherParams.toString()}`, {
            credentials: "include",
          }),
          fetch(`http://localhost:8080/traffic-routes?${trafficParams.toString()}`, {
            credentials: "include",
          }),
        ])

        if (weatherResponse.ok) {
          const weatherData = await weatherResponse.json() as WeatherApiResponse

          setWeather({
            city: "Bucharest",
            date: new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            }).format(new Date()),
            temperature: Math.round(weatherData.temperature ?? weatherMock.temperature),
            condition: getWeatherCondition(weatherData.weatherCode),
            humidity: Math.round(weatherData.humidity ?? weatherMock.humidity),
            windSpeed: Math.round(weatherData.windSpeed ?? weatherMock.windSpeed),
          })
        }

        if (trafficResponse.ok) {
          const trafficData = await trafficResponse.json() as RouteApiResponse[]
          setRoutes(trafficData)
        }
      } catch {
        setRoutes([])
      }
    }

    if (!navigator.geolocation) {
      loadCityOverview()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadCityOverview({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      () => {
        loadCityOverview()
      },
    )
  }, [])

  const hasLiveRoutes = routes.length > 0
  const visibleRoutes = hasLiveRoutes ? routes : fallbackTrafficRoutes

  return (
    <DashboardCard title="City Overview" className="flex flex-col gap-6">
      <section className="rounded-xl bg-[#F5F3FF] p-5">
        <h3 className="font-bold text-[#29255E]">
          Weather - {weather.city}
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          {weather.date}
        </p>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
              <CloudRain className="h-7 w-7" />
            </div>

            <div>
              <p className="text-3xl font-bold text-[#29255E]">
                {weather.temperature}°C
              </p>

              <p className="text-sm text-gray-500">
                {weather.condition}
              </p>
            </div>
          </div>

          <div className="flex gap-7 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />

              <span>
                Humidity: {weather.humidity}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4" />

              <span>
                Wind: {weather.windSpeed} km/h
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[280px] flex-1 rounded-xl bg-[#F5F3FF] p-5">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-[#29255E]">
            Traffic - Bucharest
          </h3>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
            {hasLiveRoutes ? "Live" : "Mock"}
          </span>
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white/60">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Ruta</th>
                <th className="px-4 py-3">Masina</th>
                <th className="px-4 py-3">Pe jos</th>
                <th className="px-4 py-3">Bicicleta</th>
                <th className="px-4 py-3">Transport comun</th>
                <th className="px-4 py-3">Distanta</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-[#29255E]">
              {visibleRoutes.map((route, index) => {
                const estimates = estimateTravelTimes(route.distanceInMeters)
                const color = hasLiveRoutes
                  ? getTrafficColor(route.durationInSeconds, route.distanceInMeters)
                  : trafficMock[index]?.color ?? "#10B981"

                return (
                  <tr key={`${route.routeName}-${index}`}>
                    <td className="px-4 py-4 font-semibold">
                      <span className="mr-3 inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                      {route.routeName}
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      {hasLiveRoutes ? formatMinutes(route.durationInSeconds) : trafficMock[index]?.level}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {hasLiveRoutes ? estimates.walking : trafficMock[index]?.interval || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {hasLiveRoutes ? estimates.bicycling : "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {hasLiveRoutes ? estimates.transit : "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {hasLiveRoutes ? formatDistance(route.distanceInMeters) : "-"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardCard>
  )
}

export default CityOverviewCard