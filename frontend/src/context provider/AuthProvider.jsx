import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext, FeedbackContext } from "./createContext";
import { useContext } from "react";
import { apiInstance } from "../utils/apiInstance";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { showSuccessMessage, showErrorMessage } = useContext(FeedbackContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get("/api/users/user");

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
      await apiInstance.post("/api/auth/logout", {});

      setUser(null);
      navigate("/login");
      showSuccessMessage("you logged out successfully!");
    } catch (error) {
      console.log(error.response?.data);
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await apiInstance.post("/api/auth/login", formData);

      const user = response?.data?.user;
      if (user) {
        setUser(user);
        showSuccessMessage("you logged in successfully!");
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data);
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      const response = await apiInstance.post("/api/auth/register", formData);

      const user = response?.data?.user;
      if (user) {
        setUser(user);
        navigate("/dashboard");
        showSuccessMessage("account created successfully!");
      }
    } catch (error) {
      console.log("data", error.response?.data);
      showErrorMessage(error?.response?.data?.message);
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
