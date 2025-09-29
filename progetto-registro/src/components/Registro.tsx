import React, { useState, useEffect } from "react";
import ButtonAppBar from "./ButtonAppBar";
import Box from "@mui/material/Box";
import type { ButtonAppBarProps } from "../types/menu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import type { Lezione, Presenza } from "../types/presenza";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


export default function Registro({ menuItems }: ButtonAppBarProps) {
  //unisco i tipi Presenza Studente e Lezione
  const [presenze, setPresenze] = useState<(Presenza & { nome: string; cognome: string; dataLezione: string })[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [lezioniRes, studentiRes] = await Promise.all([
          fetch("/api/lezioni"),
          fetch("/api/studenti"),
        ]);

const lezioniData: Lezione[] = await lezioniRes.json();
const elencoStudenti: { cf: string; nome: string; cognome: string }[] =
  await studentiRes.json();

const row = lezioniData.flatMap((lezione) =>
  lezione.studenti.map((presenzaStudente) => {
    const datiStudente = elencoStudenti.find(
      (studenteInfo) => studenteInfo.cf === presenzaStudente.cf
    );

    return {
      cf: presenzaStudente.cf,
      nome: datiStudente?.nome ?? "N/D",
      cognome: datiStudente?.cognome ?? "N/D",
      dataLezione: lezione.dataLezione,
      ore: presenzaStudente.ore,
    };
  })
);

setPresenze(row);

      } catch (error) {
        console.error("Errore nel fetch:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box>
      <ButtonAppBar menuItems={menuItems}></ButtonAppBar>

      <Box >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="registro presenze">
            <TableHead>
              <TableRow>
                <TableCell>Codice Fiscale</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Cognome</TableCell>
                <TableCell align="right">Data Lezione</TableCell>
                <TableCell align="right">Ore Presenza</TableCell>
                <TableCell align="right">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {presenze.map((row) => (
                <TableRow
                  key={row.cf + "-" + row.dataLezione}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.cf}</TableCell>
                  <TableCell align="right">{row.nome}</TableCell>
                  <TableCell align="right">{row.cognome}</TableCell>
                  <TableCell align="right">{row.dataLezione}</TableCell>
                  <TableCell align="right">{row.ore}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        navigate("/nuova-presenza/")
                      }
                    >
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => navigate("/nuova-presenza")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
