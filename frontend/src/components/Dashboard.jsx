import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AuthContext } from "../context provider/createContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Typography variant="h4">Dashboard</Typography>

      {user && (
        <>
          <Typography variant="h4">Welcome, {user.role}!</Typography>
          <br />
          {user &&
            Object.entries(user).map(([key, value]) => {
              return (
                <li key={key}>
                  {key} : {value}
                </li>
              );
            })}
        </>
      )}
    </>
  );
}
