import { useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
<<<<<<< HEAD
import Navbar from "@/components/Navbar"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"
import HomePage from "@/pages/HomePage"
=======
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"
import Home from "@/pages/Home"
>>>>>>> ffd72e46e1143de213ba889e97c7cb6e4b3acb64
import SeatsPage from "@/pages/SeatsPage"
import Login from "@/pages/Login"
import ForgotPassword from "@/pages/ForgotPassword"
import Register from "@/pages/Register"
<<<<<<< HEAD
import Home from "@/pages/Home"
=======
>>>>>>> ffd72e46e1143de213ba889e97c7cb6e4b3acb64
import Dashboard from "@/pages/Dashboard"
import ChangePassword from "@/pages/ChangePassword"
import Notifications from "@/pages/Notifications"
import History from "@/pages/History"
import UserDetails from "@/pages/UserDetails"
import Seats from "@/pages/Seats"
<<<<<<< HEAD

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
=======
import Invite from "./pages/Invite"
import TypeOfReservation from './pages/TypeOfReservation';

export default function App() {
  const [, setIsLoggedIn] = useState(false)
>>>>>>> ffd72e46e1143de213ba889e97c7cb6e4b3acb64
  const location = useLocation()

  const dashboardPages = [
    "/dashboard",
    "/notifications",
    "/history",
    "/user-details",
<<<<<<< HEAD
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
=======
    "/invite",
    "/type-of-reservation"
  ]

  const showDashboardLayout = dashboardPages.includes(location.pathname)
>>>>>>> ffd72e46e1143de213ba889e97c7cb6e4b3acb64

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
<<<<<<< HEAD
        {showFeatureTopbar ? <Topbar /> : <Navbar />}

        <main className={showDashboardLayout ? "flex-1 overflow-y-auto" : ""}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/seats" element={<SeatsPage />} />
            <Route path="/book-now" element={<Seats />} />
            <Route path="/legacy-home" element={isLoggedIn ? <Dashboard /> : <Home />} />
=======
        <Topbar />

        <main className={showDashboardLayout ? "flex-1 overflow-y-auto" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seats" element={<SeatsPage />} />
            <Route path="/book-now" element={<Seats />} />
            <Route path="/legacy-home" element={<Dashboard />} />
>>>>>>> ffd72e46e1143de213ba889e97c7cb6e4b3acb64
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/history" element={<History />} />
            <Route path="/user-details" element={<UserDetails />} />
<<<<<<< HEAD
=======
            <Route path="/invite" element={<Invite />} />
            <Route path="/type-of-reservation" element={<TypeOfReservation />}
            />
>>>>>>> ffd72e46e1143de213ba889e97c7cb6e4b3acb64
          </Routes>
        </main>
      </div>
    </div>
  )
}
