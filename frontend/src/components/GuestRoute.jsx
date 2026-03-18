import { useContext } from "react";
import { AuthContext } from "../context provider/createContext";
import { Navigate } from "react-router";

export default function GuestRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}