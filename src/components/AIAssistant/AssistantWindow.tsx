import AssistantHeader from "./AssistantHeader"
import AssistantMessage from "./AssistantMessage"
import LocationPermissionButton from "./LocationPermissionButton"
import type { AssistantStatus } from "./types"

type AssistantWindowProps = {
  status: AssistantStatus
  message: string
  onClose: () => void
  onRequestLocation: () => void
}

const AssistantWindow = ({
  status,
  message,
  onClose,
  onRequestLocation,
}: AssistantWindowProps) => {
  const isLoading =
    status === "requesting-location" ||
    status === "loading"

  const showLocationButton =
    status === "idle" || status === "error"

  return (
    <div className="fixed bottom-24 right-6 z-50 flex max-h-[600px] w-[380px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[28px] border border-[#C4B5FD] bg-white shadow-2xl">
      <AssistantHeader onClose={onClose} />

      <AssistantMessage
        message={message}
        isLoading={isLoading}
      />

      {showLocationButton && (
        <div className="border-t border-[#DDD6FE] bg-white p-4">
          <LocationPermissionButton
            onClick={onRequestLocation}
          />
        </div>
      )}
    </div>
  )
}

export default AssistantWindow