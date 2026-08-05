import { Link } from "react-router-dom"

type LandingActionsProps = {
  registerTo: string
  loginTo: string
}

export default function LandingActions({ registerTo, loginTo }: LandingActionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Link
        to={registerTo}
        className="rounded-lg bg-white px-8 py-3 text-xl font-bold text-[#6D28D9] transition hover:bg-gray-200"
      >
        Register
      </Link>
      <Link
        to={loginTo}
        className="rounded-lg border bg-[#6D28D9] px-8 py-3 text-xl font-bold text-white transition hover:bg-[#5B21B6]"
      >
        Log in
      </Link>
    </div>
  )
}
