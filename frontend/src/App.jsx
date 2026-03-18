import "./App.css";
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{ height: "100px" }} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginForm />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterForm />
              </GuestRoute>
            }
          />
        </Routes>
    </>
  );
}

export default App;
