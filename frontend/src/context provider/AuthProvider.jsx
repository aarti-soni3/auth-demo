import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext, FeedbackContext } from "./createContext";
import { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAxiosInstance } from "../hooks/useAxiosInstance";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const [, setToken] = useLocalStorage(import.meta.env.VITE_TOKEN_KEY, null);

  const { showSuccessMessage, showErrorMessage } = useContext(FeedbackContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/users/user");
        
        const user = response?.data?.user;
        if (user) {
          setUser(user);
          navigate("/dashboard");
        } else if (response.statusCode === 401) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error.response.data, error.response.status);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout", {});
      setUser(null);
      setToken(null);
      navigate("/login");
      showSuccessMessage("you logged out successfully!");
    } catch (error) {
      console.log(error.response?.data);
      // showErrorMessage(error?.response?.data?.message);
      showErrorMessage(error?.customMessage);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", formData);

      const user = response?.data?.user,
        accessToken = response?.data?.accessToken;

      if (user) {
        if (accessToken) setToken(accessToken);

        setUser(user);
        showSuccessMessage("you logged in successfully!");
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data);
      // showErrorMessage(error?.response?.data?.message);
      showErrorMessage(error?.customMessage);
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", formData);

      const user = response?.data?.user,
        accessToken = response?.data?.accessToken;

      if (user) {
        if (accessToken) setToken(accessToken);
        setUser(user);
        navigate("/dashboard");
        showSuccessMessage("account created successfully!");
      }
    } catch (error) {
      console.log("data", error.response?.data);
      // showErrorMessage(error?.response?.data?.message);
      showErrorMessage(error?.customMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleLogout,
        handleCreateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
