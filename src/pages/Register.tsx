import { useState } from "react"
import AuthFooterLink from "@/components/forms/AuthFooterLink"
import AuthLayout from "@/components/forms/AuthLayout"
import AuthMessage from "@/components/forms/AuthMessage"
import FormField from "@/components/forms/FormField"
import SubmitButton from "@/components/forms/SubmitButton"

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  })

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

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match!")
      return
    }

    setError("")
    setLoading(true)
    console.log("Datele trimise:", formData)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const isInactive =
    formData.email.trim() === "" ||
    !(formData.email.includes("@") && (formData.email.includes(".com") || formData.email.includes(".eu"))) ||
    formData.password === "" ||
    formData.repeatPassword === ""

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
        <FormField id="password" name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
        <FormField id="repeatPassword" name="repeatPassword" label="Repeat password" type="password" value={formData.repeatPassword} onChange={handleChange} />
        <AuthMessage>{error}</AuthMessage>
        <SubmitButton disabled={isInactive || loading} loading={loading} label="Submit" loadingLabel="Submitting..." />
        <AuthFooterLink text="Do you already have an account?" to="/login" linkLabel="Log in" />
      </form>
    </AuthLayout>
  )
}

export default Register
