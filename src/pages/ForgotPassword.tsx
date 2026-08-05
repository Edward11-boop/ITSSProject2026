import { useState } from "react"
import { Link } from "react-router-dom"

import AuthFooterLink from "@/components/forms/AuthFooterLink"
import AuthLayout from "@/components/forms/AuthLayout"
import AuthMessage from "@/components/forms/AuthMessage"
import FormField from "@/components/forms/FormField"
import SubmitButton from "@/components/forms/SubmitButton"
import ErrorPopUp from "@/components/ErrorPopUp"

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
          </AuthMessage>

          <SubmitButton
            disabled={isInactive}
            loading={loading}
            label="Send reset link"
            loadingLabel="Sending..."
          />

          <AuthFooterLink
            text="Do you already have an account?"
            to="/login"
            linkLabel="Back to log in"
          />
        </form>
      </AuthLayout>

      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <ErrorPopUp
            title="Password reset failed"
            message={error}
            sideMessage={
              <>
                Verificați dacă ați introdus corect adresa de email.
                <br />
                Dacă vă amintiți parola, vă puteți autentifica.{" "}
                <Link
                  to="/login"
                  onClick={() => setError("")}
                  className="font-semibold text-[#6D28D9] hover:underline"
                >
                  Log in
                </Link>
              </>
            }
            onClose={() => setError("")}
          />
        </div>
      )}
    </>
  )
}

export default ForgotPassword