import { useEffect, useState } from "react";

export default function useLocalStorage(key,defaultValue) {
  const setInitialValue = () => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.log(error.message);
      return defaultValue;
    }
  };

  const [token, setToken] = useState(setInitialValue);

  useEffect(() => {
    try {
      localStorage.setItem(key,JSON.stringify(token));
    } catch (error) {
      console.log(error, error.message);
    }
  }, [key,token]);

  return [token, setToken];
}
