import { useState, useEffect } from "react"
import { useCallback } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"
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
import TypeOfReservation from "./pages/TypeOfReservation"
import Invite from "./pages/Invite"
import HRReports from './pages/HR/HRReports';
import SelectDateTime from "./pages/SelectDateTime"
import Preferences from './pages/HR/Preferences';
import IstoricAngajati from "./pages/HR/IstoricAngajati"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const location = useLocation()

  const refreshNotificationCount = useCallback(async () => {
    fetch("http://localhost:8080/api/notifications/me/unread-count", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) return 0;
        return res.json();
      })
      .then((data) => {
        const count = data?.count ?? 0;
        setNotificationCount(Number(count));
      })
      .catch(() => setNotificationCount(0));
  }, []);

  useEffect(() => {
    const handleNotificationChange = (event: Event) => {
      const delta = (event as CustomEvent<{ delta?: number }>).detail?.delta
      if (typeof delta === "number") {
        setNotificationCount((currentCount) => Math.max(0, currentCount + delta))
      }

      void refreshNotificationCount()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refreshNotificationCount()
      }
    }

    void refreshNotificationCount()
    window.addEventListener("notifications:changed", handleNotificationChange)
    window.addEventListener("focus", refreshNotificationCount)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("notifications:changed", handleNotificationChange)
      window.removeEventListener("focus", refreshNotificationCount)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [location.pathname, refreshNotificationCount])

  const dashboardPages = [
    "/dashboard",
    "/notifications",
    "/history",
    "/hr-reports",
    "/user-details",
    "/type-of-reservation",
    "/book-now",
    "/seats",
    "/invite",
    "/select-date",
    "/preferences",
    "/preferinte",
    "/istoric"
  ]

  const authPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/change-password",
    "/legacy-home",
    "/"
  ]

  const showDashboardLayout = dashboardPages.includes(location.pathname)
  const showFeatureTopbar = showDashboardLayout || authPages.includes(location.pathname)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false)
  return (
    <div
      className={
        showDashboardLayout
          ? "flex h-screen overflow-hidden"
          : "min-h-screen bg-slate-50"
      }
    >
      {showDashboardLayout && <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
      }

      <div
        className={
          showDashboardLayout
            ? "flex min-w-0 flex-1 flex-col"
            : "min-h-screen w-full"
        }
      >
        {showFeatureTopbar && <Topbar
            notificationCount={notificationCount}
            onOpenMobileMenu={() =>
              setIsMobileSidebarOpen(true)
            }
          />
        }

        <main className={showDashboardLayout ? "flex-1 overflow-x-hidden overflow-y-auto" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-now" element={<TypeOfReservation />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/legacy-home" element={<Dashboard />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/history" element={<History />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/type-of-reservation" element={<TypeOfReservation />} />
            <Route path="/invite" element={<Invite />} />

            <Route path="/hr-reports" element={<HRReports />} />
            <Route path="/select-date" element={<SelectDateTime />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/preferinte" element={<Preferences />} />
            <Route path="/istoric" element={<IstoricAngajati />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
