import { useState, type Dispatch, type SetStateAction } from 'react' 
import { Link, useNavigate } from 'react-router-dom'

type LoginProps = {
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
}

const Register = (_props: LoginProps) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    role: 'DEV',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      setError('Passwords do not match!')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Creăm contul
      const registerResponse = await fetch('http://localhost:8080/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
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

      // Contul e nou (firstLog: true) -> mergem obligatoriu la change-password.
      // Trimitem emailul + parola temporară mai departe, ca userul să nu le retasteze.
      // (nu facem login aici — backend-ul refuză intenționat login-ul cât timp
      // parola nu a fost schimbată, exact cum ar trebui)
      navigate('/change-password', {
        state: { email: formData.email, oldPassword: formData.password },
      })
    } catch (err) {
      setError('Nu am putut contacta serverul. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  const isInactive =
    formData.name.trim() === '' ||
    formData.email.trim() === '' ||
    !(
      formData.email.includes('@') &&
      (formData.email.includes('.com') || formData.email.includes('.eu'))
    ) ||
    formData.password === '' ||
    formData.repeatPassword === ''

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F3FF]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-8 text-[#1E1B4B]"
      >
        <h1 className="mb-4 text-center text-[48px]">
          Register
        </h1>

        <label htmlFor="name" className="text-24">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none"
        />

        <label htmlFor="email" className="text-24">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none"
        />

        <label htmlFor="role" className="text-24">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none bg-white"
        >
          <option value="DEV">Developer</option>
          <option value="PM">Project Manager</option>
          <option value="MANAGER">Manager</option>
          <option value="CEO">CEO</option>
        </select>

        <label htmlFor="password" className="text-24">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none"
        />

        <label htmlFor="repeatPassword" className="text-24">
          Repeat password
        </label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none"
        />

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isInactive || loading}
          className={`mt-4 rounded-lg p-2 text-24 font-semibold transition-colors ${isInactive || loading
            ? 'cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]'
            : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white'
            }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        <p className="text-center text-20 text-[#6B7280] mt-4">
          Do you already have an account?
          <Link to="/login" className="text-[#6D28D9] font-semibold ml-1">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
