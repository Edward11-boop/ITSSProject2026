import { useState } from "react"
import { Bot } from "lucide-react"
import AssistantWindow from "./components/AssistantWindow"
import type { AssistantStatus } from "./types"

const idleMessage =
  "Salut! Pot sa te ajut cu informatii despre vreme si trafic pentru drumul catre birou."

const getLocalTargetHour = () => {
  const now = new Date()
  now.setMinutes(0, 0, 0)
  const timezoneOffsetMs = now.getTimezoneOffset() * 60 * 1000
  return new Date(now.getTime() - timezoneOffsetMs).toISOString().slice(0, 19)
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<AssistantStatus>("idle")
  const [message, setMessage] = useState(idleMessage)

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error")
      setMessage("Browserul tau nu permite accesarea locatiei.")
      return
    }

    setStatus("requesting-location")
    setMessage("Astept permisiunea pentru locatie...")

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus("loading")
        setMessage("Analizez traficul si vremea pentru drumul catre birou...")

        try {
          const params = new URLSearchParams({
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude),
            targetHour: getLocalTargetHour(),
          })

          const response = await fetch(
            `http://localhost:8080/recommendation?${params.toString()}`,
          )

          if (!response.ok) {
            throw new Error(await response.text())
          }

          const recommendation = await response.text()

          setStatus("succes")
          setMessage(recommendation || "Nu am primit o recomandare momentan.")
        } catch {
          setStatus("error")
          setMessage(
            "Nu am putut obtine recomandarea de trafic si vreme. Incearca din nou mai tarziu.",
          )
        }
      },
      () => {
        setStatus("error")
        setMessage(
          "Nu am putut obtine locatia. Verifica permisiunile browserului si incearca din nou.",
        )
      },
    )
  }

  return (
    <>
      {isOpen && (
        <AssistantWindow
          status={status}
          message={message}
          onClose={() => setIsOpen(false)}
          onRequestLocation={handleRequestLocation}
        />
      )}

      <button
        type="button"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B5CF6] text-2xl text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#7C3AED] sm:bottom-10 sm:right-10 sm:h-16 sm:w-16"
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
      >
        <Bot className="h-7 w-7 sm:h-8 sm:w-8" />
      </button>
    </>
  )
}

export default AIAssistant

