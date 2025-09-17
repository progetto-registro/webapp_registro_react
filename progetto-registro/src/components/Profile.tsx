import Box from "@mui/material/Box";
import ButtonAppBar from "./ButtonAppBar";
import type { ButtonAppBarProps } from "../types/menu";

export function Profile({ menuItems }: ButtonAppBarProps) {
  return (
    <Box>
      <ButtonAppBar menuItems={menuItems} />

      <Box>
       
      </Box>
    </Box>
  );
}
