import { Outlet } from "react-router-dom";
import ButtonAppBar from "./ButtonAppBar";
import Box from "@mui/material/Box";
import type { ButtonAppBarProps } from "../types/menu";

export function ProtectedLayout({ menuItems }: ButtonAppBarProps) {
  return (
    <Box>
      <ButtonAppBar menuItems={menuItems} />
      <Box sx={{ p: 3, mt: 8 }}>
        <Outlet /> 
      </Box>
    </Box>
  );
}
