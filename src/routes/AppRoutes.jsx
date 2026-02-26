import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Todos from "../pages/Todos";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import UserSelect from "../pages/UserSelect";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/users", element: <UserSelect /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/todos",
        element: (
          <ProtectedRoute>
            <Todos />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
