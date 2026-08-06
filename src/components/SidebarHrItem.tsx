import { Link } from "react-router-dom";
import hrReports from "../assets/HR_reports_icon.svg";
import historyIcon from "../assets/istoric_angajatit.svg";
import preferencesIcon from "../assets/preferinte_icon.svg";

type SidebarHrItemProps = {
  isExtended: boolean;
};

const SidebarHrItem = ({ isExtended }: SidebarHrItemProps) => {
  return (
    <div className="group relative mt-10 flex justify-center">
      <Link
        to="/hr-reports"
        className={`flex items-center justify-center gap-3 rounded-[18px] bg-[#6D28D9] px-3 py-3 transition-all hover:bg-[#7C3AED] ${isExtended ? "w-[calc(100%-24px)]" : ""
          }`}
      >
        <img src={hrReports} alt="HR reports" className="h-8 w-8 sm:h-10 sm:w-10" />

        {isExtended && (
          <span className="whitespace-nowrap text-[20px] text-white sm:text-[24px]">
            HR
          </span>
        )}
      </Link>

      <div className="absolute left-full top-0 z-50 hidden w-64 flex-col overflow-hidden rounded-sm bg-[#EDE9FE] shadow-lg group-hover:flex">
        <button
          type="button"
          className="flex items-center gap-4 px-5 py-4 text-left text-lg font-bold text-[#111827] hover:bg-[#DDD6FE]"
        >
          <img src={historyIcon} alt="" className="h-7 w-7" />
          Istoric
        </button>

        <Link
          to="/preferences"
          className="flex items-center gap-4 bg-[#E9D5FF] px-5 py-4 text-left text-lg font-bold text-[#111827] hover:bg-[#D8B4FE]"
        >
          <img src={preferencesIcon} alt="" className="h-7 w-7" />
          Preferinte
        </Link>
      </div>
    </div>
  );
};

export default SidebarHrItem;