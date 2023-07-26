import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatify
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Layout;
