import { Link } from "react-router-dom"

type SidebarNavItemProps = {
  to: string
  icon: string
  label: string
  isExtended: boolean
}

const SidebarNavItem = ({ to, icon, label, isExtended }: SidebarNavItemProps) => {
  return (
    <Link to={to} className="mt-10 flex flex-col">
      <button
        type="button"
        className="mt-auto flex items-center justify-center gap-3 rounded-lg px-1 py-1 hover:bg-[#6D28D9]"
      >
        <img src={icon} alt={label} className="h-8 w-8 sm:h-10 sm:w-10" />

        {isExtended && (
          <span className="whitespace-nowrap text-[20px] text-white sm:text-[24px]">
            {label}
          </span>
        )}
      </button>
    </Link>
  )
}

export default SidebarNavItem
