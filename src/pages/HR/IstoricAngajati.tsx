import { useEffect, useMemo, useState } from "react"
import {
  Building2,
  CalendarDays,
  Search,
  Users,
  X,
} from "lucide-react"

import BackButton from "@/components/BackButton"
import AIAssistant from "../AIAssistant"

type EmployeeAttendance = {
  id: string
  name: string
  department: string
  presenceDays: number
  totalWorkingDays: number
  attendanceDates: string[]
}

const IstoricAngajati = () => {
  const [employees, setEmployees] = useState<EmployeeAttendance[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All departments")
  const [selectedDate, setSelectedDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8080/hr/attendance-history", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load attendance history")
        }
        return response.json() as Promise<EmployeeAttendance[]>
      })
      .then((data) => {
        setEmployees(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        setEmployees([])
      })
      .finally(() => setIsLoading(false))
  }, [])

  const departments = [
    "All departments",
    ...Array.from(new Set(employees.map((employee) => employee.department).filter(Boolean))),
  ]

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    return employees.filter((employee) => {
      const matchesSearch = employee.name.toLowerCase().includes(normalizedSearch)
      const matchesDepartment =
        selectedDepartment === "All departments" || employee.department === selectedDepartment
      const matchesDate =
        selectedDate === "" || employee.attendanceDates.includes(selectedDate)

      return matchesSearch && matchesDepartment && matchesDate
    })
  }, [employees, searchValue, selectedDepartment, selectedDate])

  const hasActiveFilters =
    searchValue.trim() !== "" ||
    selectedDepartment !== "All departments" ||
    selectedDate !== ""

  const clearFilters = () => {
    setSearchValue("")
    setSelectedDepartment("All departments")
    setSelectedDate("")
  }

  return (
    <div className="min-h-full bg-[#F5F3FF] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <BackButton className="mb-4" fallbackTo="/dashboard" />

        <section className="rounded-2xl border border-[#DDD6FE] bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#6D28D9]">
              <Users className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#29255E] sm:text-3xl">
                Istoricul prezenței la birou al angajaților
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Caută colegii și analizează frecvența prezenței lor la birou.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_auto]">
            <div>
              <label htmlFor="employee-search" className="mb-2 block text-sm font-semibold text-[#29255E]">
                Caută un coleg
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="employee-search"
                  type="search"
                  placeholder="Introdu numele colegului..."
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="w-full rounded-xl border-2 border-[#DDD6FE] bg-white py-3 pl-12 pr-4 text-[#29255E] outline-none transition focus:border-[#6D28D9]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="department" className="mb-2 block text-sm font-semibold text-[#29255E]">
                Departament
              </label>

              <div className="relative">
                <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(event) => setSelectedDepartment(event.target.value)}
                  className="w-full appearance-none rounded-xl border-2 border-[#DDD6FE] bg-white py-3 pl-12 pr-4 text-[#29255E] outline-none transition focus:border-[#6D28D9]"
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="attendance-date" className="mb-2 block text-sm font-semibold text-[#29255E]">
                Ziua prezenței
              </label>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="attendance-date"
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="w-full rounded-xl border-2 border-[#DDD6FE] bg-white py-3 pl-12 pr-4 text-[#29255E] outline-none transition focus:border-[#6D28D9]"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#6D28D9] px-5 py-3 font-semibold text-[#6D28D9] transition hover:bg-[#EDE9FE] disabled:cursor-not-allowed disabled:border-[#DDD6FE] disabled:text-gray-400 disabled:hover:bg-transparent xl:w-auto"
              >
                <X className="h-5 w-5" />
                Resetează
              </button>
            </div>
          </div>
        </section>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-[#29255E]">
            Rezultatele prezenței
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredEmployees.length}{" "}
            {filteredEmployees.length === 1 ? "angajat găsit" : "angajați găsiți"}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-8 text-center text-gray-500">Se încarcă istoricul...</div>
        ) : filteredEmployees.length > 0 ? (
          <div className="mt-6 flex flex-col gap-5">
            {filteredEmployees.map((employee) => {
              const attendancePercentage = Math.round(
                (employee.presenceDays / employee.totalWorkingDays) * 100,
              )

              const firstName = employee.name.split(" ")[0]

              return (
                <article
                  key={employee.id}
                  className="rounded-2xl border border-[#DDD6FE] bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#29255E]">
                        {employee.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {employee.department}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#EDE9FE] px-4 py-2 text-sm font-semibold text-[#6D28D9]">
                      {attendancePercentage}% prezență
                    </span>
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#F5F3FF] p-4 text-sm text-[#29255E]">
                    <p>
                      {firstName} a avut {employee.presenceDays} zile de prezență din {employee.totalWorkingDays} zile lucrătoare în luna curentă.
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-400">
            Nu a fost găsit niciun angajat după filtrele selectate.
          </div>
        )}

        <AIAssistant />
      </div>
    </div>
  )
}

export default IstoricAngajati
