import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
  const initialData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const [formData, SetFormData] = useState(initialData);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      throw Error(error)
    }
  };

  const handleOnChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    SetFormData((prevFormData) => {
      return {
        ...prevFormData,
        [key]: value,
      };
    });
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
          Register Form
        </Typography>
        <br />
        <form onSubmit={handleOnSubmit}>
          <Stack
            flexDirection="column"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <FormControl>
              <TextField
                id="filled-basic"
                label="First name"
                variant="standard"
                name="firstname"
                value={formData.firstname}
                onChange={handleOnChange}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="filled-basic"
                label="Last name"
                variant="standard"
                name="lastname"
                value={formData.lastname}
                onChange={handleOnChange}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="filled-basic"
                label="Email"
                variant="standard"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="filled-basic"
                label="Username"
                variant="standard"
                name="username"
                value={formData.username}
                onChange={handleOnChange}
              />
            </FormControl>

            <FormControl>
              <TextField
                type="password"
                id="filled-basic"
                label="Password"
                variant="standard"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
              />
            </FormControl>

            <Button type="submit" variant="contained">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
}
