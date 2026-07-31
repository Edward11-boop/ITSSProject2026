import DashboardCard from "@/components/dashboard/DashboardCard"
import DashboardWelcome from "@/components/dashboard/DashboardWelcome"
import PlaceholderPanel from "@/components/dashboard/PlaceholderPanel"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FE] p-8">
      <div className="mx-auto max-w-6xl">
        <DashboardWelcome />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DashboardCard title="Your Office Activity">
            <PlaceholderPanel label="Charts placeholder" heightClassName="h-64" />
          </DashboardCard>

          <div className="flex flex-col gap-6">
            <DashboardCard title="Weather - Bucharest">
              <PlaceholderPanel label="Weather placeholder" heightClassName="h-24" />
            </DashboardCard>

            <DashboardCard
              title="Traffic - Bucharest"
              className="flex-1"
              action={(
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                  Live
                </span>
              )}
            >
              <PlaceholderPanel label="Traffic placeholder" heightClassName="h-32" />
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
