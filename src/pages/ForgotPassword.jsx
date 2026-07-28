import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [formData, setFormData] = useState ({
    email: '',
  });

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

    console.log(formData)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const [loading, setLoading] = useState(false)
  const isInactive =
    formData.email.trim() === '' ||
    !(
      formData.email.includes('@') &&
      (formData.email.includes('.com') ||
        formData.email.includes('.eu'))
    )

  return (
   <div className="min-h-screen flex items-center justify-center bg-[#F5F3FF]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-8 text-[#1E1B4B]"
          >
            <h1 className="mb-4 text-center text-[40px]">
              Forgot your password
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

        </form>
      
    </div>
  )
}

export default ForgotPassword
