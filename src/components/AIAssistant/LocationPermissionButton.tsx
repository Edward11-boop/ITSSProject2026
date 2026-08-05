import { MapPin } from "lucide-react"


type LocationPermissionButtonProps = {
  onClick: () => void
  disabled?: boolean
}

const LocationPermissionButton = ({onClick, disabled}: LocationPermissionButtonProps) => {
  return (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6D28D9] px-5 py-3 font-semibold text-white transition hover:bg-[#5B21B6] disabled:cursor-not-allowed disabled:bg-[#C4B5FD]"
    >
      <MapPin className="h-5 w-5" />
    </button>
  )
}

export default LocationPermissionButton
