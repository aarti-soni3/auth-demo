import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Authentication Demo
          </Typography>
          <nav
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            {/* <NavLink to="/logout">Logout</NavLink> */}
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
