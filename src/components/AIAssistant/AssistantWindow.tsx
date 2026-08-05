import { Bot, LoaderCircle, MapPin, X } from "lucide-react"
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
      <div className="flex items-center justify-between bg-[#312E81] px-4 py-3 text-white sm:px-5 sm:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-11 sm:w-11">
            <Bot className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Travel Assistant
            </h2>
          </div>

          <p className="hidden text-xs text-purple-200 sm:block">
            Weather and traffic information
          </p>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15"
            aria-label="Close assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F5F3FF] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#6D28D9]">
            <Bot className="h-5 w-5" />
          </div>

          <div className="rounded-2xl rounded-tl-sm border border-[#DDD6FE] bg-white px-4 py-3 shadow-sm">
            <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
              {message}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#6D28D9]">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            <span>Se incarca...</span>
          </div>
        )}
      </div>

      {showLocationButton && (
        <div className="border-t border-[#DDD6FE] bg-white p-4">
          <button
            type="button"
            onClick={onRequestLocation}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6D28D9] px-5 py-3 font-semibold text-white transition hover:bg-[#5B21B6] disabled:cursor-not-allowed disabled:bg-[#C4B5FD]"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default AssistantWindow