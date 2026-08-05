import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarNavItem from "@/components/SidebarNavItem";
import logo from "../assets/Logo_without_bg.svg";
import collapsedArrow from "../assets/CollapseArrow.svg";
import home from "../assets/Home.svg";
import invite from "../assets/Invite.svg";
import history from "../assets/History.svg"

const navItems = [
  { to: "/dashboard", icon: home, label: "Home" },
  { to: "/invite", icon: invite, label: "Invite" },
  { to: "/history", icon: history, label: "History" },
]

const Sidebar = () => {
  const [isExtended, setIsExtended] = useState(false);
  return (
    <aside className={`h-screen shrink-0 overflow-hidden bg-[#1E1B4B] transition-all duration-300 ${
        isExtended ? "w-56 sm:w-64" : "w-16 sm:w-26"
      }`}
    >
      <nav className="flex h-full flex-col bg-[#1E1B4B]">
        <br />
        <Link to="/">
          <div className="flex items-center gap-3 justify-center">
            <img
              src={logo}
              alt="BookIT logo"
              className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
            />

            {isExtended && (
              <h1 className="whitespace-nowrap text-[24px] font-semibold text-white sm:text-[30px]">
                BookIT
              </h1>
            )}
          </div>
        </Link>

        <div className="mt-10 flex flex-col gap-">
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isExtended={isExtended}
            />
          ))}
        </div>

          <button type="button" 
                  onClick={() => setIsExtended((previous) => !previous)}
                  className="mt-auto flex justify-center rounded-lg p-2 gap-3 hover:bg-[#6D28D9]/10"
                  aria-label={
                    isExtended ? "Collapse sidebar" : "Expand sidebar"
                  }
          >
            <img
              src={collapsedArrow}
              alt="Collapse sidebar"
              className={`h-8 w-8 transition-transform duration-300 sm:h-10 sm:w-10  ${
                    isExtended ? "rotate-180" : ""
                  }`}
            />

            {isExtended && (
                <span className="text-white text-[20px] whitespace-nowrap sm:text-[24px]">
                  Extend
                </span>             
            )}
          </button>

          <br />
      </nav>
    </aside>
  );
};

export default Sidebar;