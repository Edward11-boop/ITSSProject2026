import { X } from "lucide-react"

type CloseButtonProps = {
  onClose: () => void
}

const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15"
      aria-label="Close assistant"
    >
      <X className="h-5 w-5" />
    </button>
  )
}

export default CloseButton