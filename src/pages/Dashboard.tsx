import AIAssistant from "@/pages/AIAssistant"
import CityOverviewCard from "@/components/dashboard/CityOverviewCard"
import OfficeActivityCard from "@/components/dashboard/OfficeActivityCard"

const Dashboard = () => {
  const mockUser = {
    name: "User",
  }

  return (
    <div className="min-h-full bg-[#F5F3FF] p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Greeting */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-[#29255E] sm:text-2xl">
            Good morning, {mockUser.name}!
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Ready to book your seat for today?
          </p>
        </div>
      </div>
      <FloatingIcon />
    </div>
  )
}

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