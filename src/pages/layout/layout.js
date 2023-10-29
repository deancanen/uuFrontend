import NavBar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <div className="footer p-16" />
    </>
  );
}

export default Layout;
