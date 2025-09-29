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
  async function fetchData() {
    try {
      const [lezioniRes, studentiRes] = await Promise.all([
        fetch("/api/lezioni"),
        fetch("/api/studenti"),
      ]);

      const lezioniData: Lezione[] = await lezioniRes.json();
      const studentiData: { cf: string; nome: string; cognome: string }[] =
        await studentiRes.json();

      const rows = lezioniData.flatMap((lezione) =>
        lezione.studenti.map((studente, index) => {
          const stud = studentiData.find((s) => s.cf === studente.cf);
          return {
            id: `${lezione.id}-${index}`,
            cf: studente.cf,
            nome: stud!.nome,
            cognome: stud!.cognome,
            dataLezione: lezione.dataLezione,
            ore: studente.ore,
          };
        })
      );

      setPresenze(rows);
    } catch (error) {
      console.error("Errore nel fetch:", error);
    }
  }

  fetchData();
}, []);


const columns: GridColDef[] = [
  { field: "cf", headerName: "Codice Fiscale", width: 150 },
  { field: "nome", headerName: "Nome", width: 150 },
  { field: "cognome", headerName: "Cognome", width: 150 },
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
          onClick={() => navigate("/nuova-presenza")}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}
