import ButtonAppBar from "./ButtonAppBar";
import Box from '@mui/material/Box';
import type { ButtonAppBarProps } from '../types/menu';


export function Studenti({ menuItems }: ButtonAppBarProps) {
 


  return (
    <Box>

      <ButtonAppBar menuItems={menuItems}></ButtonAppBar>
        <Box>
          
        </Box>

    </Box>
  );
}