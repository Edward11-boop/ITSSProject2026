import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react"
import { Link, useNavigate } from "react-router-dom"

type RegisterProps = {
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
}

const Register = (_props: RegisterProps) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "DEV",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match!")
      return
    }

    setError("")
    setLoading(true)

    try {
      const registerResponse = await fetch(
        "http://localhost:8080/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: formData.role,
          }),
        },
      )

      if (!registerResponse.ok) {
        const message = await registerResponse.text()

        setError(
          message || "Registration could not be completed.",
        )
        return
      }

      navigate("/change-password", {
        state: {
          email: formData.email.trim(),
          oldPassword: formData.password,
        },
      })
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
    formData.name.trim() === "" ||
    !isValidEmail ||
    formData.password === "" ||
    formData.repeatPassword === "" ||
    loading

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3FF] px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-8 text-[#1E1B4B]"
      >
        <h1 className="mb-4 text-center text-[48px]">
          Register
        </h1>

        <label
          htmlFor="name"
          className="text-[24px]"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:border-[#6D28D9] focus:outline-none"
        />

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
          htmlFor="role"
          className="text-[24px]"
        >
          Role
        </label>

        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] bg-white px-4 py-2 focus:border-[#6D28D9] focus:outline-none"
        >
          <option value="DEV">Developer</option>
          <option value="PM">Project Manager</option>
          <option value="MANAGER">Manager</option>
          <option value="CEO">CEO</option>
        </select>

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

        <label
          htmlFor="repeatPassword"
          className="text-[24px]"
        >
          Repeat password
        </label>

        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          placeholder="Repeat your password"
          value={formData.repeatPassword}
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
          {loading ? "Submitting..." : "Register"}
        </button>

        <p className="mt-4 text-center text-[20px] text-[#6B7280]">
          Do you already have an account?

          <Link
            to="/login"
            className="ml-1 font-semibold text-[#6D28D9] hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register