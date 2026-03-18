import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./createContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const initializeUser = async () => {
  //     try {
  //       setLoading(true);

  //       let response = await axios.get("http://localhost:3000/api/users/user", {
  //         withCredentials: true,
  //       });

  //       const basicUser = response.data.user;

  //       if (basicUser) {
  //         let endpoint = "/api/users/user";
  //         if (basicUser.role === "manager") endpoint = "/api/users/manager";
  //         if (basicUser.role === "admin") endpoint = "/api/users/admin";

  //         response = await axios.get(`http://localhost:3000${endpoint}`, {
  //           withCredentials: true,
  //         });

  //         setUser(response.data.user);
  //         navigate("/dashboard");
  //       }
  //     } catch (error) {
  //       console.error("Auth initialization failed", error.response?.status);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   initializeUser();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/users/user",
          {
            withCredentials: true,
          },
        );

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

  // useEffect(() => {
  //   const fetchRoleData = async () => {
  //     try {
  //       setLoading(true);

  //       let endpoint = "/api/users/user";
  //       if (user) {
  //         if (user.role === "manager") endpoint = "/api/users/manager";
  //         else if (user.role === "admin") endpoint = "/api/users/admin";
  //       }

  //       const response = await axios.get(`http://localhost:3000${endpoint}`, {
  //         withCredentials: true,
  //       });

  //       const userData = response?.data?.user;
  //       if (userData) {
  //         setUserData(userData);
  //         navigate("/dashboard");
  //       } else if (response.statusCode === 401) {
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       console.log(error.response.data, error.response.status);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (user) fetchRoleData();
  // }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true },
      );

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const user = response?.data?.user;
      console.log(user)
      if (user) {
        setUser(user);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const user = response?.data?.user;
      if (user) {
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("data", error.response?.data);
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
