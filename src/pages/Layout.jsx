import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../auth";

function Layout() {
  const user = useAuth();
  const [signOut, loading] = useSignOut(auth);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatify
          </Typography>

          {user ? (
            <Button
              disabled={loading}
              onClick={handleLogout}
              variant="contained"
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Layout;
