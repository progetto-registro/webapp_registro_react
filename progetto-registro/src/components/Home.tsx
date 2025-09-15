import ButtonAppBar from "./ButtonAppBar";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HomeIcon from '@mui/icons-material/Home';
import type { MenuItem } from '../types/menu';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardItem from '../components/CardItem';

export function Home() {
  
  const menuItems: MenuItem[] = [
  { text: 'Home', icon: <HomeIcon fontSize="large" />, path: '/home' },
  { text: 'Profilo', icon: <AccountBoxIcon fontSize="large" />, path: '/profilo' },
  { text: 'Studenti', icon: <FormatListBulletedAddIcon fontSize="large" />, path: '/studenti' },
  { text: 'Registro', icon: <AppRegistrationIcon fontSize="large" />, path: '/registro' },
  { text: 'Presenze', icon: <EditCalendarIcon fontSize="large" />, path: '/presenze' },
];

  return (
    <Box>
      <ButtonAppBar menuItems={menuItems} />

      <Box sx={{ p: 3, mt: 8 }}>
        <Grid container spacing={2} justifyContent="center">
          {menuItems.map((item) => (
            <Grid item key={item.text}>
              <CardItem text={item.text} icon={item.icon} path={item.path} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
