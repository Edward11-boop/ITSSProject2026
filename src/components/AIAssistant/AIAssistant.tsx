import { useState } from "react"
import AssistantWindow from "./AssistantWindow"
import FloatingIcon from "./FloatingIcon"
import type { AssistantStatus } from "./types"

const idleMessage =
  "Salut! Pot sa te ajut cu informatii despre vreme si trafic pentru drumul catre birou."

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
      () => {
        setStatus("succes")
        setMessage(
          "Locatia a fost primita. Asistentul este pregatit pentru integrarea datelor de vreme si trafic."
        )
      },
      () => {
        setStatus("error")
        setMessage(
          "Nu am putut obtine locatia. Verifica permisiunile browserului si incearca din nou."
        )
      }
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

      <FloatingIcon
        isOpen={isOpen}
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      />
    </>
  )
}

export default AIAssistant
