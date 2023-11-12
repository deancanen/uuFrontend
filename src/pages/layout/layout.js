import NavBar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <>
      <NavBar currentUser={props.currentUser} />
      <Outlet />
      <div className="footer p-16" />
    </>
  );
}

export default Layout;
