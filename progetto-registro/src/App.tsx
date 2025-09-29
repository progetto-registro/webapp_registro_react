
import { BrowserRouter, Route, Routes } from 'react-router';
import { StartingPage } from './components/StartingPage';
import { Home } from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login/Login';
import './App.css';
import { Profile } from './components/Profile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import type { MenuItem } from './types/menu';
import Registro from './components/Registro';
import { Studenti } from './components/Studenti';

function App() {

  const menuItems: MenuItem[] = [
  { text: 'Home', icon: <HomeFilledIcon fontSize="large" />, path: '/home' },
  { text: 'Profilo', icon: <AccountBoxIcon fontSize="large" />, path: '/profilo' },
  { text: 'Studenti', icon: <FormatListBulletedAddIcon fontSize="large" />, path: '/studenti' },
  { text: 'Registro', icon: <AppRegistrationIcon fontSize="large" />, path: '/registro' },
  { text: 'Presenze', icon: <EditCalendarIcon fontSize="large" />, path: '/presenze' },
  { text: 'Logout', icon: <LogoutIcon fontSize="large" />, path: '/' },
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Home menuItems={menuItems}/>} />
        <Route path="/profilo" element={<Profile menuItems={menuItems}/>} />
        <Route path="/registro" element={<Registro menuItems={menuItems}/>} />
        <Route path="/studenti" element={<Studenti menuItems={menuItems}/>} />
        <Route path="/presenze" element={<StartingPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
