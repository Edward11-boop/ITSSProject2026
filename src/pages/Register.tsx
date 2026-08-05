import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Link } from "react-router-dom"

import AuthFooterLink from "@/components/forms/AuthFooterLink"
import AuthLayout from "@/components/forms/AuthLayout"
import FormField from "@/components/forms/FormField"
import SelectField from "@/components/forms/SelectField"
import SubmitButton from "@/components/forms/SubmitButton"
import ErrorPopUp from "@/components/ErrorPopUp"

const roleOptions = [
  { value: "DEV", label: "Developer" },
  { value: "PM", label: "Project Manager" },
  { value: "MANAGER", label: "Manager" },
  { value: "CEO", label: "CEO" },
]

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "DEV",
    password: "",
    repeatPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    setError("")
  }

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (formData.password !== formData.repeatPassword) {
      setError("Parolele introduse nu coincid.")
      return
    }

    setError("")
    setLoading(true)

    const registerData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    }

    console.log("Datele trimise:", registerData)

    // Simulare eroare până când este conectat backendul
    window.setTimeout(() => {
      setLoading(false)
      setError("Înregistrarea nu a putut fi efectuată.")
    }, 1000)
  }

  const isValidEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    )

  const isInactive =
    formData.name.trim() === "" ||
    !isValidEmail ||
    formData.role === "" ||
    formData.password === "" ||
    formData.repeatPassword === ""

  return (
    <>
      <AuthLayout title="Register">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <FormField
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <FormField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <SelectField
            id="role"
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
          />

          <FormField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <FormField
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat password"
            type="password"
            value={formData.repeatPassword}
            onChange={handleChange}
          />

          <SubmitButton
            disabled={isInactive || loading}
            loading={loading}
            label="Register"
            loadingLabel="Registering..."
          />

          <AuthFooterLink
            text="Do you already have an account?"
            to="/login"
            linkLabel="Log in"
          />
        </form>
      </AuthLayout>

      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <ErrorPopUp
            title="Registration failed"
            message={error}
            sideMessage={
              <>
                Verificați dacă ați introdus corect datele.
                <br/> 
                Dacă aveți deja un
                cont, vă puteți autentifica.{" "}
                <Link
                  to="/login"
                  onClick={() => setError("")}
                  className="font-semibold text-[#6B72809] hover:underline"
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

export default Register