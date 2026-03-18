import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context provider/createContext";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Authentication Demo
          </Typography>
          <nav
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {user ? (
              <NavLink
                to="/api/auth/logout"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
