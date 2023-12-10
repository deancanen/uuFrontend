import NavBar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";
import { API } from "../../service/restService";
import { useQuery } from "react-query";
async function login() {
  const res = await API.post("/login");
  return res.data;
}

interface IUser {
  user: {
    id: number;
    name: string;
  };
}

export interface OutletContext {
  user: IUser;
}

function Layout() {
  const { isLoading, error, data } = useQuery<IUser>("login", login);

  return (
    <>
      {data && (
        <>
          <NavBar currentUser={data?.user} />
          <Outlet context={{ user: data } as OutletContext} />
          <div className="footer p-16 bg-inherit" />
        </>
      )}
    </>
  );
}

export default Layout;
