import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo_without_bg.svg";
import collapsedArrow from "../assets/CollapseArrow.svg";
import home from "../assets/Home.svg";
import invite from "../assets/Invite.svg";
import history from "../assets/History.svg"

const Sidebar = () => {
  const [isExtended, setIsExtended] = useState(false);
  return (
    <aside className={`h-screen shrink-0 overflow-hidden bg-[#1E1B4B] transition-all duration-300 ${
        isExtended ? "w-64" : "w-26"
      }`}
    >
      <nav className="flex h-full flex-col bg-[#1E1B4B]">
        <br />
        <Link to="/">
          <div className="flex items-center gap-3 justify-center">
            <img
              src={logo}
              alt="BookIT logo"
              className="h-10 w-10 shrink-0"
            />

            {isExtended && (
              <h1 className="whitespace-nowrap text-[30px] font-semibold text-white">
                BookIT
              </h1>
            )}
          </div>
        </Link>

        
        <div className="mt-10 flex flex-col gap-">
          <Link to = "/dashboard"
            className="mt-10 flex flex-col"
          >
            <button type="button" 
                    className="mt-auto flex items-center justify-center rounded-lg px-1 py-1 gap-3  hover:bg-[#6D28D9]"
            >
              <img
                src={home}
                alt="Home"
                className="h-10 w-10"
              />

              {isExtended && (
                <span className= "text-white text-[24px] whitespace-nowrap">
                  Home
                </span>
              )}
            </button>
          </Link>

          <Link to="/invite"
            className="mt-10 flex flex-col"
          >
            <button type="button" 
                    className="mt-auto flex items-center justify-center rounded-lg px-1 py-1 gap-3  hover:bg-[#6D28D9]"
            >
              <img
                src={invite}
                alt="Invite"
                className="h-10 w-10"
              />

              {isExtended && (
                <span className="text-white  text-[24px] whitespace-nowrap">
                  Invite
                </span>
              )}
            </button>
          </Link>

          <Link to="/history"
                className="mt-10 flex flex-col"
          >
            <button type="button" 
                    className="mt-auto flex items-center justify-center rounded-lg px-1 py-1 gap-3  hover:bg-[#6D28D9]"
            >
              <img
                src={history}
                alt="History"
                className="h-10 w-10"
              />

              {isExtended && (
                <span className="text-white  text-[24px] whitespace-nowrap">
                  History
                </span>
              )}
            </button>
          </Link>
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
              className={`h-10 w-10 transition-transform duration-300  ${
                    isExtended ? "rotate-180" : ""
                  }`}
            />

            {isExtended && (
                <span className="text-white  text-[24px] whitespace-nowrap">
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