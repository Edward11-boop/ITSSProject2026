import { useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"
import Home from "@/pages/Home"
import SeatsPage from "@/pages/SeatsPage"
import Login from "@/pages/Login"
import ForgotPassword from "@/pages/ForgotPassword"
import Register from "@/pages/Register"
import Dashboard from "@/pages/Dashboard"
import ChangePassword from "@/pages/ChangePassword"
import Notifications from "@/pages/Notifications"
import History from "@/pages/History"
import UserDetails from "@/pages/UserDetails"
import Seats from "@/pages/Seats"
import Invite from "./pages/Invite"
import TypeOfReservation from './pages/TypeOfReservation';

export default function App() {
  const [, setIsLoggedIn] = useState(false)
  const location = useLocation()

  const dashboardPages = [
    "/dashboard",
    "/notifications",
    "/history",
    "/user-details",
    "/invite",
    "/type-of-reservation"
  ]

  const showDashboardLayout = dashboardPages.includes(location.pathname)

  return (
    <div
      className={
        showDashboardLayout
          ? "flex h-screen overflow-hidden"
          : "min-h-screen bg-slate-50"
      }
    >
      {showDashboardLayout && <Sidebar />}

      <div
        className={
          showDashboardLayout
            ? "flex min-w-0 flex-1 flex-col"
            : "min-h-screen w-full"
        }
      >
        <Topbar />

        <main className={showDashboardLayout ? "flex-1 overflow-y-auto" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seats" element={<SeatsPage />} />
            <Route path="/book-now" element={<Seats />} />
            <Route path="/legacy-home" element={<Dashboard />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/history" element={<History />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/type-of-reservation" element={<TypeOfReservation />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}
