import { useState } from "react"
import AuthFooterLink from "@/components/forms/AuthFooterLink"
import AuthLayout from "@/components/forms/AuthLayout"
import AuthMessage from "@/components/forms/AuthMessage"
import FormField from "@/components/forms/FormField"
import SubmitButton from "@/components/forms/SubmitButton"

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
      const response = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
        }),
      })

      const message = await response.text()

      if (!response.ok) {
        setError(message || "Nu am putut trimite cererea.")
        return
      }

      setSuccessMessage(
        message ||
          "Daca exista un cont asociat acestui email, vei primi instructiunile de resetare.",
      )
    } catch (err) {
      setError("Nu am putut contacta serverul. Incearca din nou.")
    } finally {
      setLoading(false)
    }
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
  const isInactive = !isValidEmail || loading

  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email and we will send you password reset instructions."
      compactTitle
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <AuthMessage>{error}</AuthMessage>
        <AuthMessage tone="success">{successMessage}</AuthMessage>
        <SubmitButton disabled={isInactive} loading={loading} label="Send reset link" loadingLabel="Sending..." />
        <AuthFooterLink text="Do you already have an account?" to="/login" linkLabel="Back to log in" />
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword
