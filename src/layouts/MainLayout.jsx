import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-blue-600 text-white shadow-md">
        <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo / Home Link */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            My To-Do App
          </Link>

          {/* Links */}
          <div className="flex gap-4 items-center">
            {!user ? (
              <>
                <Link
                  to="/users"
                  className="hover:bg-blue-500 px-3 py-1 rounded transition duration-200"
                >
                  Users
                </Link>
                <Link
                  to="/login"
                  className="hover:bg-blue-500 px-3 py-1 rounded transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hover:bg-blue-500 px-3 py-1 rounded transition duration-200"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/todos"
                  className="hover:bg-blue-500 px-3 py-1 rounded transition duration-200"
                >
                  Todos
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-100 transition duration-200"
                >
                  {user?.name} | Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet /> {/* Nested pages render here */}
        <ToastContainer position="top-right" autoClose={2000} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 py-4 text-center mt-auto">
        © 2026 My To-Do App created by Tek Dhami
      </footer>
    </div>
  );
};

export default MainLayout;
