type DashboardWelcomeProps = {
  userName?: string
}

export default function DashboardWelcome({ userName = "User" }: DashboardWelcomeProps) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-xl font-bold text-[#29255E] sm:text-2xl">
        Good morning, {userName}!
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Ready to book your seat for today?
      </p>
    </div>
  )
}