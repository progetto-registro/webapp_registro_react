import React, { useState, useEffect } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import type { Lezione, Presenza } from "../types/presenza";
import ButtonAppBar from "./ButtonAppBar";
import type { ButtonAppBarProps } from "../types/menu";

export default function Registro({ menuItems }: ButtonAppBarProps) {
  const [presenze, setPresenze] = useState<Presenza[]>([]);
  const navigate = useNavigate();

  // Fetch dati
  useEffect(() => {
    fetch("/api/lezioni")
      .then((res) => res.json())
      .then((data: Lezione[]) => {
        const rows = data.flatMap((lezione) =>
          lezione.studenti.map((studente, index) => ({
            id: Number(`${lezione.id}${index}`),
            cf: studente.cf,
            ore: studente.ore,
            dataLezione: lezione.dataLezione,
          }))
        );
        setPresenze(rows); // aggiorni lo stato che modifica il datagrid
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "cf", headerName: "Codice Fiscale", width: 150 },
    { field: "dataLezione", headerName: "Data Lezione", width: 150 },
    { field: "ore", headerName: "Ore Presenza", type: "number", width: 130 },
  ];

  return (
    <Box>
      <ButtonAppBar menuItems={menuItems}></ButtonAppBar>

      <Box sx={{ height: 500, width: "100%", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Registro Presenze
        </Typography>

        <DataGrid
          rows={presenze}
          columns={columns}
          getRowId={(row) => row.id}
        />

        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={() => navigate("/nuovapresenza")}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}
