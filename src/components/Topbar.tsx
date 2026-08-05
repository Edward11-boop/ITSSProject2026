import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.svg";
import user from "../assets/User.svg";
import details from "../assets/User_details.svg";
import logout from "../assets/Logout.svg";
import { Bell } from "lucide-react";
import TextField from "@mui/material/TextField";



const Topbar = () => {
  const location = useLocation();

  const authPages = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/change-password"
  ];

  const hiddenButtons = authPages.includes(location.pathname);

  return (
    <nav className="flex w-full flex-wrap items-center justify-between gap-3 border-b border-purple-100 bg-[#312E81] px-3 py-3 shadow-sm sm:px-6 sm:py-4">
      {hiddenButtons ? (
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10" />

          <h3 className="text-xl font-semibold text-white">
            BookIT
          </h3>
        </Link>
      ) : (
        <>
          <Link
            to="/book-now"
          >
            <button
              type="button"
              className="rounded-[60px] border border-white bg-[#6D28D9] px-3 py-2 text-sm font-bold text-white hover:bg-[#5B21B6] sm:px-4 sm:text-base"
            >
              Book now
            </button>
          </Link>

          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <div className="w-[min(44vw,180px)] sm:w-45">
              <TextField
                id="search"
                variant="outlined"
                fullWidth
                placeholder="Search"
                size="small"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "60px",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "60px",

                    "& fieldset": {
                      borderColor: "white",
                    },

                    "&:hover fieldset": {
                      borderColor: "white",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            </div>

            <Link
              to="/notifications"
            >
              <Bell className="h-7 w-7 text-white sm:h-8 sm:w-8" />
            </Link>
    
            <div className="group relative">
              <img
                src={user}
                alt="Invite"
                className="h-9 w-9 sm:h-10 sm:w-10"
              />
              <div className="absolute right-0 top-full z-50 hidden pt-2 group-hover:flex">
                <div className="flex w-48 flex-col divide-y divide-[#EDE9FE] *:overflow-hidden rounded-lg bg-[#EDE9FE] py-2 shadow-lg">

                  <div className="ml-3 flex items-center gap-4 text-[#1E1B4B] font-bold">
                    
                    <img src={user}
                        alt="Invite"
                        className="h-6 w-6"
                    />

                    <h3>Popescu Andrei</h3>
                  </div>

                  <Link
                    to="/user-details"
                    className="bg-[#E9D5FF] py-2 text-[#1E1B4B] hover:bg-[#EDE9FE]"
                  >
                    <div className="ml-3 flex items-center gap-4 text-[#1E1B4B] font-bold">
                    
                      <img src={details}
                          alt="details"
                          className="h-6 w-6"
                      />

                      <h3>User details</h3>
                    </div>
                  </Link>

                  <Link
                    to="/"
                    className="bg-[#E9D5FF] py-2 text-[#1E1B4B] hover:bg-[#EDE9FE]"
                  >
                    <div className="ml-3 flex items-center gap-4 text-[#1E1B4B] font-bold">
                    
                      <img src={logout}
                          alt="Invite"
                          className="h-6 w-6"
                      />

                      <h3>Log out</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Topbar;
