import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/signIn";
import "./App.css";
import EventDetails from "./pages/eventDetail";
import Events from "./pages/events";
import SignUp from "./pages/signUp";
import { ProtectedRoute } from "./hooks/protectedRoute";
import { AuthProvider } from "./hooks/authProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <Navigate to="/signin" />;
        </AuthProvider>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthProvider>
          <SignUp />
        </AuthProvider>
      ),
    },
    {
      path: "/signin",
      element: (
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      ),
    },
    {
      path: "/events",
      element: (
        <AuthProvider>
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        </AuthProvider>
      ),
    },
    {
      path: "/events/:id",
      element: (
        <AuthProvider>
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        </AuthProvider>
      ),
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
