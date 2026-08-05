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
          "Dacă există un cont asociat acestui email, vei primi instrucțiunile de resetare."
      )
    } catch {
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
    <>
      <AuthLayout
        title="Forgot your password?"
        description="Enter your email and we will send you password reset instructions."
        compactTitle
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
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
          className={`mt-4 rounded-lg p-2 text-[24px] font-semibold ${
            isInactive
              ? "cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]"
              : "bg-[#6D28D9] text-white hover:bg-[#5B21B6]"
          }`}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <p className="text-center text-20 text-[#6B7280] mt-4">
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
