import { Bot } from "lucide-react"
import CloseButton from "./CloseButton"

type AssistantHeaderProps = {
  onClose: () => void
}

const AssistantHeader = ({
  onClose,
}: AssistantHeaderProps) => {
    return (
        <div className="flex items-center justify-between bg-[#312E81] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Bot className="h-6 w-6" />
                </div>
 
                <div>
                    <h2 className="text-lg font-semibold">
                        Travel Assistant
                    </h2>
                </div>
              
                <p className="text-xs text-purple-200">
                    Weather and traffic information
                </p>
                
                <CloseButton onClose={onClose} />

            </div>
        </div>
    )

}

export default AssistantHeader