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
    <div className="fixed bottom-20 right-4 z-50 flex max-h-[min(520px,calc(100vh-112px))] w-[min(380px,calc(100vw-128px))] flex-col overflow-hidden rounded-[22px] border border-[#C4B5FD] bg-white shadow-2xl sm:bottom-24 sm:right-6 sm:max-h-[600px] sm:w-[380px] sm:max-w-[calc(100vw-32px)] sm:rounded-[28px]">
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