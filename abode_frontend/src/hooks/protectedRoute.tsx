import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

export const ProtectedRoute = ({ children }: any) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return children;
};
