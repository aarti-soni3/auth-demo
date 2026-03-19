import {
  Stack,
  TextField,
  FormControl,
  Typography,
  Paper,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context provider/createContext";

export default function RegisterForm() {
  const { handleCreateUser } = useContext(AuthContext);

  const initialData = {
    firstname: "",
    lastname: "",
    username: "",
    role: "user",
    email: "",
    password: "",
  };

  const [formData, SetFormData] = useState(initialData);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    handleCreateUser(formData);
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
          borderRadius: "10px",
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
                required
                autoFocus
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
                required
              />
            </FormControl>

            <FormControl>
              <TextField
                type="email"
                id="filled-basic"
                label="Email"
                variant="standard"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                required
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
                required
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
                required
              />
            </FormControl>

            <FormControl style={{ width: "240px", marginTop: "30px" }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                // variant="standard"
                labelId="role-label"
                id="role"
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleOnChange}
                required
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            </FormControl>
            <br />

            <Button type="submit" variant="contained">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
}
