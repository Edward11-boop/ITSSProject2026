import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include', // trimite/primește cookie-ul de sesiune (JSESSIONID)
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const message = await response.text()

      if (!response.ok) {
        // backend-ul trimite mesaje de eroare ca text simplu (400/401)
        setError(message)
        return
      }

      if (message === 'Password must be changed !') {
        // userul e la prima logare, trebuie să-și schimbe parola întâi
        navigate('/change-password')
        return
      }

      // login reușit, mergem la dashboard
      navigate('/home')
    } catch (err) {
      // eroare de rețea (backend oprit, CORS blocat, etc.)
      setError('Nu am putut contacta serverul. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  const isInactive =
    formData.email.trim() === '' ||
    !(
      formData.email.includes('@') &&
      (formData.email.includes('.com') ||
        formData.email.includes('.eu'))
    ) || formData.password === ''

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F3FF]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-8 text-[#1E1B4B]"
      >
        <h1 className="mb-4 text-center text-[48px]">
          Log in
        </h1>

        <label
          htmlFor="email"
          className="text-24"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none"
        />

        <label
          htmlFor="password"
          className="text-24"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
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
          className={`mt-4 rounded-lg p-2 text-24 font-semibold ${
            isInactive || loading
              ? 'cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]'
              : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white'
          }`}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-center text-20 text-[#6B7280]">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-[#6D28D9]"
          >
            Sign up
          </Link>
        </p>

        <p className="text-center text-20 text-[#6B7280]">
          Forgot your password?{' '}
          <Link
            to="/forgot-password"
            className="text-[#6D28D9]"
          >
            Reset it
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login