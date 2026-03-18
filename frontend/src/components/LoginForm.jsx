import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context provider/createContext";

export default function LoginForm() {
  const { handleLogin } = useContext(AuthContext);

  const initialData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleOnChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    handleLogin(formData);
  };

  return (
    <>
      <Paper
        elevation={3}
        square={false}
        sx={{
          width: "30%",
          padding: "40px 20px",
          margin: "0 auto",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login Form
        </Typography>
        <form onSubmit={handleOnSubmit}>
          <Stack
            flexDirection="column"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              id="filled-basic"
              label="Username"
              variant="standard"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              required
            />

            <TextField
              type="password"
              id="filled-basic"
              label="Password"
              variant="standard"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              required
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
}
