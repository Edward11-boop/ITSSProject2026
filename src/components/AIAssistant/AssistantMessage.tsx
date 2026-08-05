import { Bot, LoaderCircle } from "lucide-react"

type AssistantMessageProps = {
  message: string
  isLoading: boolean
}

const AssistantMessage = ({
  message,
  isLoading,
}: AssistantMessageProps) => {
  return (
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

          <span>Se încarcă...</span>
        </div>
      )}
    </div>
  )
}

export default AssistantMessage