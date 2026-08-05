import { Bot } from "lucide-react"
import CloseButton from "./CloseButton"

type AssistantHeaderProps = {
  onClose: () => void
}

const AssistantHeader = ({
  onClose,
}: AssistantHeaderProps) => {
    return (
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
                
                <CloseButton onClose={onClose} />

            </div>
        </div>
    )

}

export default AssistantHeader