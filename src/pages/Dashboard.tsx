import AIAssistant from "@/pages/AIAssistant";

const Dashboard = () => {
    return (

        <div className="min-h-screen bg-[#F8F9FE] p-8">


            <div className="mx-auto max-w-6xl">

                <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">
                    <h2 className="mb-2 text-2xl font-bold text-[#29255E]">Good morning, User!</h2>
                    <p className="text-gray-500">Ready to book your seat for today?</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-[#29255E]">Your Office Activity</h3>
                        {/* Aici vor veni graficele mai târziu */}
                        <div className="mt-4 flex h-64 items-center justify-center rounded-lg bg-gray-50">
                            <p className="text-gray-400">Charts placeholder</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-[#29255E]">Weather — Bucharest</h3>
                            <div className="mt-4 flex h-24 items-center justify-center rounded-lg bg-gray-50">
                                <p className="text-gray-400">Weather placeholder</p>
                            </div>
                        </div>

                        <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-[#29255E]">Traffic — Bucharest</h3>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">Live</span>
                            </div>
                            <div className="mt-4 flex h-32 items-center justify-center rounded-lg bg-gray-50">
                                <p className="text-gray-400">Traffic placeholder</p>
                            </div>
                        </div>

                    </div>
                </div>
                <AIAssistant />

            </div>
        </div>
      </div>
      <FloatingIcon />
    </div>
  )
}

export default Dashboard



