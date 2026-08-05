import { useState, type Dispatch, type SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    formData.email.trim() === "" ||
    !(formData.email.includes("@") && (formData.email.includes(".com") || formData.email.includes(".eu"))) ||
    formData.password === ""

return (
  <>
    <AuthLayout title="Log in">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <SubmitButton
          disabled={isInactive || loading}
          loading={loading}
          label="Submit"
          loadingLabel="Submitting..."
        />

        <AuthFooterLink
          text="Don't you have an account?"
          to="/login"
          linkLabel="Log in"
        />

        <AuthFooterLink
          text="Did you forget your password?"
          to="/forgot-password"
          linkLabel="Reset it"
        />
      </form>
    </AuthLayout>

    {error && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <ErrorPopUp
          title="Log in failed"
          message={"Logarea nu s-a putut efectua"}
          sideMessage={
            <>
              Verificați dacă ați introdus corect datele. 
              <br/>
              Dacă nu aveți deja un
              cont, vă puteți crea unul.{" "}
              <Link
                to="/register"
                onClick={() => setError("")}
                className="font-semibold text-[#6B72809] hover:underline"
              >
                Register
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

export default Login
