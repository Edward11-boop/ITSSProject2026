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
          className="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5CF6] text-2xl text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#7C3AED]"
          aria-label={isOpen ? "Close assistant" : "Open assistant"}
        >  
          <Bot className="h-8 w-8" />
        </button>
    </div>
  )
}

export default FloatingIcon

