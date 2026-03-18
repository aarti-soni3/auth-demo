import { useContext } from "react";
import { AuthContext } from "../context provider/createContext";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h4>loading...</h4>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
