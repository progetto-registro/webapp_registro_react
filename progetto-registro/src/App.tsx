import { BrowserRouter, Route, Routes } from "react-router";
import { StartingPage } from "./components/StartingPage";
import { Home } from "./components/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import "./App.css";
import { Profile } from "./components/Profilo/Profile";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import type { MenuItem } from "./types/menu";
import Registro from "./components/Registro/Registro";
import { Studenti } from "./components/Studenti/Studenti";
import NuovaPresenza from "./components/NuovaPresenza/NuovaPresenza";
import { NuovoStudente } from "./components/Studenti/NuovoStudente";

function App() {
  const menuItems: MenuItem[] = [
    { text: "Home", icon: <HomeFilledIcon fontSize="large" />, path: "/home" },
    {
      text: "Profilo",
      icon: <AccountBoxIcon fontSize="large" />,
      path: "/profilo",
    },
    {
      text: "Studenti",
      icon: <FormatListBulletedAddIcon fontSize="large" />,
      path: "/studenti",
    },
    {
      text: "Registro",
      icon: <AppRegistrationIcon fontSize="large" />,
      path: "/registro",
    },
    {
      text: "Presenze",
      icon: <EditCalendarIcon fontSize="large" />,
      path: "/nuova-presenza",
    },
    { text: "Logout", icon: <LogoutIcon fontSize="large" />, path: "/" },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* Route pubbliche */}
        <Route path="/" element={<StartingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Route protette */}
        <Route path="/" element={<Home menuItems={menuItems} />}>
          <Route path="home" element={<Home menuItems={menuItems} />} />
          <Route path="profilo" element={<Profile menuItems={menuItems} />} />
          <Route path="studenti" element={<Studenti menuItems={menuItems} />} />
          <Route path="registro" element={<Registro menuItems={menuItems} />} />
          <Route path="nuova-presenza" element={<NuovaPresenza menuItems={menuItems} />} />
        </Route>
</Routes>
    </BrowserRouter>
  );
}

export default App;
