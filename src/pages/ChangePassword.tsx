import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // emailul (si, daca vine direct din Register, parola temporara) vin din
  // pagina anterioara, dar raman editabile, ca pagina sa functioneze si accesata direct
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    oldPassword: location.state?.oldPassword || '',
    newPassword: '',
  })

  const [confirmPassword, setConfirmPassword] = useState('')
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

    if (formData.newPassword !== confirmPassword) {
      setError('Parolele nu coincid.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:8080/change-password', {
        method: 'PUT',
        credentials: 'include', // trimite cookie-ul de sesiune
        headers: { 'Content-Type': 'application/json' },
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

      // parola schimbata cu succes -> acum ne logam cu parola NOUA,
      // ca sa obtinem sesiune, apoi mergem la dashboard
      const loginResponse = await fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.newPassword,
        }),
      })

      if (!loginResponse.ok) {
        // parola s-a schimbat, dar login-ul automat a esuat -> trimitem
        // userul la login manual, in loc sa-l blocam
        navigate('/login')
        return
      }

      navigate('/home')
    } catch {
      setError('Nu am putut contacta serverul. Incearca din nou.')
    } finally {
      setLoading(false)
    }
  }

  const isInactive =
    formData.email.trim() === '' ||
    formData.oldPassword === '' ||
    formData.newPassword === '' ||
    confirmPassword === ''

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3FF] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-5 text-[#1E1B4B] sm:p-8"
      >
        <h1 className="mb-4 text-center text-[36px] sm:text-[48px]">
          Change password
        </h1>

        <p className="text-center text-base text-[#6B7280] sm:text-[20px]">
          Trebuie sa-ti setezi o parola noua inainte de a continua.
        </p>

        <label
          htmlFor="email"
          className="text-[20px] sm:text-[24px]"
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
          htmlFor="oldPassword"
          className="text-[20px] sm:text-[24px]"
        >
          Current password
        </label>

        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          placeholder="Enter your current password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none"
        />

        <label
          htmlFor="newPassword"
          className="text-[20px] sm:text-[24px]"
        >
          New password
        </label>

        <input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none"
        />

        <label
          htmlFor="confirmPassword"
          className="text-[20px] sm:text-[24px]"
        >
          Confirm new password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          className={`mt-4 rounded-lg p-2 text-[20px] font-semibold sm:text-[24px] ${
            isInactive || loading
              ? 'cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]'
              : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white'
          }`}
        >
          {loading ? 'Changing password...' : 'Change password'}
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
