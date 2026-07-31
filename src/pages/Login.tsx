import { useState, type Dispatch, type SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import AuthFooterLink from "@/components/forms/AuthFooterLink"
import AuthLayout from "@/components/forms/AuthLayout"
import AuthMessage from "@/components/forms/AuthMessage"
import FormField from "@/components/forms/FormField"
import SelectField from "@/components/forms/SelectField"
import SubmitButton from "@/components/forms/SubmitButton"

type LoginProps = {
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
}

const roleOptions = [
  { value: "DEV", label: "Developer" },
  { value: "PM", label: "Project Manager" },
  { value: "MANAGER", label: "Manager" },
  { value: "CEO", label: "CEO" },
]

const Login = (_props: LoginProps) => {
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

    try {
      const registerResponse = await fetch("http://localhost:8080/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      if (!registerResponse.ok) {
        const message = await registerResponse.text()
        setError(message)
        return
      }

      navigate("/change-password", {
        state: { email: formData.email, oldPassword: formData.password },
      })
    } catch (err) {
      setError("Nu am putut contacta serverul. Incearca din nou.")
    } finally {
      setLoading(false)
    }
  }

  const isInactive =
    formData.name.trim() === "" ||
    formData.email.trim() === "" ||
    !(formData.email.includes("@") && (formData.email.includes(".com") || formData.email.includes(".eu"))) ||
    formData.password === "" ||
    formData.repeatPassword === ""

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField id="name" name="name" label="Name" value={formData.name} onChange={handleChange} />
        <FormField id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
        <SelectField id="role" name="role" label="Role" value={formData.role} onChange={handleChange} options={roleOptions} />
        <FormField id="password" name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
        <FormField id="repeatPassword" name="repeatPassword" label="Repeat password" type="password" value={formData.repeatPassword} onChange={handleChange} />
        <AuthMessage>{error}</AuthMessage>
        <SubmitButton disabled={isInactive || loading} loading={loading} label="Submit" loadingLabel="Submitting..." />
        <AuthFooterLink text="Do you already have an account?" to="/login" linkLabel="Log in" />
      </form>
    </AuthLayout>
  )
}

export default Login
