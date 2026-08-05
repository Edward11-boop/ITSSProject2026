import { Bot } from "lucide-react"

type FloatingIconProps = {
  onClick: () => void
  isOpen: boolean
}

const FloatingIcon = ({onClick, isOpen}:  FloatingIconProps) => {
  return (
    <div>
        <button
          type="button"
          onClick={onClick} 
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B5CF6] text-2xl text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#7C3AED] sm:bottom-10 sm:right-10 sm:h-16 sm:w-16"
          aria-label={isOpen ? "Close assistant" : "Open assistant"}
        >  
          <Bot className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>
    </div>
  )
}

export default FloatingIcon

