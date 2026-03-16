import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
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

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      throw Error(error);
    }
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
            />

            <TextField
              type="password"
              id="filled-basic"
              label="Password"
              variant="standard"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
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
