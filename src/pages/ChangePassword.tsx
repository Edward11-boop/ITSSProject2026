import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthLayout from "@/components/forms/AuthLayout"
import AuthMessage from "@/components/forms/AuthMessage"
import FormField from "@/components/forms/FormField"
import SubmitButton from "@/components/forms/SubmitButton"

const ChangePassword = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    oldPassword: location.state?.oldPassword || "",
    newPassword: "",
  })

  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formData.newPassword !== confirmPassword) {
      setError("Parolele nu coincid.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/change-password", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      })

      const message = await response.text()

      if (!response.ok) {
        setError(message)
        return
      }

      const loginResponse = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.newPassword,
        }),
      })

      if (!loginResponse.ok) {
        navigate("/login")
        return
      }

      navigate("/dashboard")
    } catch (err) {
      setError("Nu am putut contacta serverul. Incearca din nou.")
    } finally {
      setLoading(false)
    }
  }

  const isInactive =
    formData.email.trim() === "" ||
    formData.oldPassword === "" ||
    formData.newPassword === "" ||
    confirmPassword === ""

  return (
    <AuthLayout
      title="Change password"
      description="Trebuie sa-ti setezi o parola noua inainte de a continua."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField id="email" name="email" label="Email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
        <FormField id="oldPassword" name="oldPassword" label="Current password" type="password" placeholder="Enter your current password" value={formData.oldPassword} onChange={handleChange} />
        <FormField id="newPassword" name="newPassword" label="New password" type="password" placeholder="Enter your new password" value={formData.newPassword} onChange={handleChange} />
        <FormField id="confirmPassword" name="confirmPassword" label="Confirm new password" type="password" placeholder="Confirm your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <AuthMessage>{error}</AuthMessage>
        <SubmitButton disabled={isInactive || loading} loading={loading} label="Change password" loadingLabel="Changing password..." />
      </form>
    </AuthLayout>
  )
}

export default ChangePassword
