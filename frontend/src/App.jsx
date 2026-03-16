import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{ height: "100px" }} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
