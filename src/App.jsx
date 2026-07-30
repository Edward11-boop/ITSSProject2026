import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import Notifications from "./pages/Notifications";
import History from './pages/History';

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";


const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const dashboardPages = [
    "/dashboard",
    "/notifications",
  ];

  const showDashboardLayout =
    dashboardPages.includes(location.pathname) ||
    (location.pathname === "/" && isLoggedIn);

  return (
    <div
      className={
        showDashboardLayout
          ? "flex h-screen overflow-hidden"
          : "min-h-screen"
      }
    >
      {showDashboardLayout && <Sidebar />}

      <div
        className={
          showDashboardLayout
            ? "flex min-w-0 flex-1 flex-col"
            : "min-h-screen"
        }
      >
        <Topbar />

        <main
          className={
            showDashboardLayout
              ? "flex-1 overflow-y-auto"
              : ""
          }
        >
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Dashboard /> : <Home />}
            />

            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} />
              }
            />

            <Route
              path="/signup"
              element={<Register />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/change-password"
              element={<ChangePassword />}
            />

            {/* Acces temporar fără autentificare */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/notifications"
              element={<Notifications />}
            />
            <Route
              path="/history"
              element={<History />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;