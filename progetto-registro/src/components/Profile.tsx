import ButtonAppBar from "./ButtonAppBar";
import Box from '@mui/material/Box';
import type { ButtonAppBarProps } from '../types/menu';

export function Profile({ menuItems }: ButtonAppBarProps){

    return(
        <Box>

            <ButtonAppBar menuItems={menuItems}></ButtonAppBar>
            <Box>Profile works!</Box>

        </Box>

        
    );
}