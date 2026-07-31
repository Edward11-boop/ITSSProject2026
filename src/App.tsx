import { useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"
import HomePage from "@/pages/HomePage"
import SeatsPage from "@/pages/SeatsPage"
import Login from "@/pages/Login"
import ForgotPassword from "@/pages/ForgotPassword"
import Register from "@/pages/Register"
import Home from "@/pages/Home"
import Dashboard from "@/pages/Dashboard"
import ChangePassword from "@/pages/ChangePassword"
import Notifications from "@/pages/Notifications"
import History from "@/pages/History"
import UserDetails from "@/pages/UserDetails"
import Seats from "@/pages/Seats"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  const dashboardPages = [
    "/dashboard",
    "/notifications",
    "/history",
    "/user-details",
  ]

  const authPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/change-password",
    "/legacy-home",
  ]

  const showDashboardLayout = dashboardPages.includes(location.pathname) 
  const showFeatureTopbar = showDashboardLayout || authPages.includes(location.pathname)

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
        {showFeatureTopbar ? <Topbar /> : <Navbar />}

        <main className={showDashboardLayout ? "flex-1 overflow-y-auto" : ""}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/seats" element={<SeatsPage />} />
            <Route path="/book-now" element={<Seats />} />
            <Route path="/legacy-home" element={isLoggedIn ? <Dashboard /> : <Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/history" element={<History />} />
            <Route path="/user-details" element={<UserDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
