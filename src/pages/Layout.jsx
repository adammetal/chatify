import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>This will be the navbar</nav>
      <Outlet />
    </>
  );
}

export default Layout;
