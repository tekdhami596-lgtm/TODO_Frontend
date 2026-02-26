import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setNameError("Username is required");
      return;
    }

    if (username.trim().length < 3) {
      setNameError("Username must be at least 3 characters");
      return;
    }

    if (password.trim().length < 6) {
      setPasswordError("password length must be at least 6 characters");
      return;
    }

    try {
      const { user, token, message } = await signup({
        username,
        email,
        password,
      });

      login(user, token);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Signup
        </h2>

        {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                setNameError("");
              }}
              required
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
            {nameError && (
              <p className="text-red-500 text-sm mb-4">{nameError}</p>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mb-4">{passwordError}</p>
            )}
          </div>
          {/* Signup Button */}
          <button
            type="submit"
            disabled={password === null && username === null}
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow transition duration-200"
          >
            Signup
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
