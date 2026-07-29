import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.svg";

const Topbar = () => {
  const locations = useLocation();

  const authPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/"
  ];

  let hiddenButtons = authPages.includes(locations.pathname);


  return (
    <nav className="flex items-center justify-between border-b border-purple-100 bg-[#312E81] px-8 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        <h3 className="text-xl font-semibold text-white">
          BookIT
        </h3>
      </div>

      {!hiddenButtons && (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Topbar;