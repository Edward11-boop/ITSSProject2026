import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react"
import { Link, useNavigate } from "react-router-dom"

type LoginProps = {
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    setError("")
  }

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      const loginResponse = await fetch(
        "http://localhost:8080/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        },
      )

      if (!loginResponse.ok) {
        const message = await loginResponse.text()

        setError(
          message ||
            "Emailul sau parola introduse nu sunt corecte.",
        )
        return
      }

      setIsLoggedIn?.(true)
      navigate("/dashboard")
    } catch {
      setError(
        "Nu am putut contacta serverul. Încearcă din nou.",
      )
    } finally {
      setLoading(false)
    }
  }

  const isValidEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim(),
    )

  const isInactive =
    !isValidEmail ||
    formData.password === "" ||
    loading

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3FF]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-8 text-[#1E1B4B]"
      >
        <h1 className="mb-4 text-center text-[48px]">
          Log in
        </h1>

        <label
          htmlFor="email"
          className="text-[24px]"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:border-[#6D28D9] focus:outline-none"
        />

        <label
          htmlFor="password"
          className="text-[24px]"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:border-[#6D28D9] focus:outline-none"
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isInactive}
          className={`mt-4 rounded-lg p-2 text-[24px] font-semibold transition-colors ${
            isInactive
              ? "cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]"
              : "bg-[#6D28D9] text-white hover:bg-[#5B21B6]"
          }`}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="mt-4 text-center text-[20px] text-[#6B7280]">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-1 font-semibold text-[#6D28D9]"
          >
            Register
          </Link>
        </p>

        <p className="mt-4 text-center text-[20px] text-[#6B7280]">
          Did you forget your password?
          <Link
            to="/forgot-password"
            className="ml-1 font-semibold text-[#6D28D9]"
          >
            Reset it
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login