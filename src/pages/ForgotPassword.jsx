import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");
    setLoading(true);

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
      );

      const message = await response.text();

      if (!response.ok) {
        setError(message || "Nu am putut trimite cererea.");
        return;
      }

      setSuccessMessage(
        message ||
          "Dacă există un cont asociat acestui email, vei primi instrucțiunile de resetare."
      );
    } catch (err) {
      setError(
        "Nu am putut contacta serverul. Încearcă din nou."
      );
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    );

  const isInactive = !isValidEmail || loading;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3FF] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-8 text-[#1E1B4B]"
      >
        <h1 className="mb-2 text-center text-[40px] font-semibold">
          Forgot your password?
        </h1>

        <p className="mb-4 text-center text-gray-500">
          Enter your email and we will send you password reset
          instructions.
        </p>

        <label
          htmlFor="email"
          className="text-[24px] font-medium"
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
          className="w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:border-[#6D28D9] focus:outline-none"
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isInactive}
          className={`mt-4 rounded-lg p-2 text-[24px] font-semibold ${
            isInactive
              ? "cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]"
              : "bg-[#6D28D9] text-white hover:bg-[#5B21B6]"
          }`}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <p className="text-center text-20 text-[#6B7280] mt-4">
          Do you already have an account?
          <Link to="/login" className="text-[#6D28D9] font-semibold ml-1">
            Back to log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;