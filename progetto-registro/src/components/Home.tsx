import ButtonAppBar from "./ButtonAppBar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardItem from '../components/CardItem';
import type { ButtonAppBarProps } from '../types/menu';

export function Home({ menuItems }: ButtonAppBarProps) {
  

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
