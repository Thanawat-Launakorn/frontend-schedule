import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IRoute from "./models/IRoute";
import Signin from "./pages/signin";
import Layout from "./components/layouts";
import Home from "./pages/home";
import UserList from "./pages/userList";
import Booking from "./pages/booking";
import ErrorPage from "./pages/errorPage";
import CreateUser from "./pages/createUser";
import EditUser from "./pages/editUser";
import SettingDate from "./pages/settingDate_Notiline_NotiEmail";
import * as api from "./config/axios";
function App() {
  const routes: Array<IRoute> = [
    { path: "/home", element: <Home /> },
    { path: "/Signin", element: <Signin /> },
    { path: "/User", element: <UserList /> },
    { path: "/CreateUser", element: <CreateUser /> },
    { path: "/user/:id/EditUser", element: <EditUser /> },
    { path: "/Booking", element: <Booking /> },
    { path: "/SettingDate", element: <SettingDate /> },
    { path: "/*", element: <ErrorPage /> },
  ];
  return (
    <div className="">
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map(({ path, element }) => {
              return <Route path={path} element={element} key={path} />;
            })}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
