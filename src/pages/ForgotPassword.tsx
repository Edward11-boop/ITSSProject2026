import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    setError("")
    setSuccessMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setSuccessMessage("")
    setLoading(true)

    try {
      const response = await fetch(
        "http://localhost:8080/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
          }),
        }
      )

      const message = await response.text()

      if (!response.ok) {
        setError(
          message ||
            "Cererea de resetare a parolei nu a putut fi trimisă."
        )
        return
      }

      setSuccessMessage(
        message ||
          "Dacă există un cont asociat acestui email, vei primi instruc?iunile de resetare."
      );
    } catch (err) {
      setError(
        "Nu am putut contacta serverul. Încearcă din nou."
      )
    } finally {
      setLoading(false)
    }
  }

  const isValidEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    )

  const isInactive = !isValidEmail || loading

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3FF] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-5 text-[#1E1B4B] sm:p-8"
      >
        <h1 className="mb-2 text-center text-[32px] font-semibold sm:text-[40px]">
          Forgot your password?
        </h1>

        <p className="mb-4 text-center text-gray-500">
          Enter your email and we will send you password reset
          instructions.
        </p>

        <label
          htmlFor="email"
          className="text-[20px] font-medium sm:text-[24px]"
        >
          <FormField
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            labelClassName="text-[24px] font-medium"
            inputClassName="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:border-[#6D28D9] focus:outline-none"
          />

          <AuthMessage tone="success">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isInactive}
          className={`mt-4 rounded-lg p-2 text-[20px] font-semibold sm:text-[24px] ${
            isInactive
              ? "cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]"
              : "bg-[#6D28D9] text-white hover:bg-[#5B21B6]"
          }`}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <p className="mt-4 text-center text-base text-[#6B7280] sm:text-[20px]">
          Do you already have an account?
          <Link to="/login" className="text-[#6D28D9] font-semibold ml-1">
            Back to log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
