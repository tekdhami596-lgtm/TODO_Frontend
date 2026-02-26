// services/authService.js
import api from "../api/axios"; // ✅ Use your custom api instance

// ✅ Signup function
export const signup = async ({ username, email, password }) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    console.log(response.data);

    const { user, token } = response.data;
    const message = response.data.message

    console.log("user:", user);
    console.log("token:", token);

    // Store token and user in localStorage
    localStorage.setItem("token", token);

    return { user, token, message };
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login function
export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    // console.log("message: ", response.data.message);
    const { user, token } = response.data;
    const message = response.data.message;

    console.log("user:", user);
    console.log("token:", token);

    if (!user || !token) {
      throw new Error("Invalid server response");
    }
    // Store token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token, message };
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || error.message || "Login failed",
    );
  }
};

// ✅ Logout function
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // Always clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
