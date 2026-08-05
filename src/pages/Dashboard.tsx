import AIAssistant from "@/pages/AIAssistant"
import CityOverviewCard from "@/components/dashboard/CityOverviewCard"
import OfficeActivityCard from "@/components/dashboard/OfficeActivityCard"
import DashboardWelcome from "@/components/dashboard/DashboardWelcome"

const Dashboard = () => {
  const mockUser = {
    name: "User",
  }

  return (
    <div className="min-h-full bg-[#F5F3FF] p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <DashboardWelcome userName={mockUser.name} />

        {/* Dashboard content */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.85fr_1.35fr]">
          <OfficeActivityCard />

          <CityOverviewCard />
        </div>
      </div>

      <AIAssistant />
    </div>
  )
}

export default Dashboard