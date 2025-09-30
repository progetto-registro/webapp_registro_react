import ButtonAppBar from "./ButtonAppBar";
import type { ButtonAppBarProps } from "../types/menu";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Studente } from "../types/studente";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";

export function Studenti({ menuItems }: ButtonAppBarProps) {
  const [studenti, setStudenti] = useState<Studente[]>([]);

  useEffect(() => {
    fetch("/api/studenti", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella risposta: " + res.status);
        return res.json();
      })
      .then((data: Studente[]) => {
        console.log("Dati ricevuti:", data);
        setStudenti(data);
      })
      .catch((err) => console.error("Errore nel recupero", err));
  }, []);

  const handleDelete = useCallback(
    async (cf: string) => {
      try {
        const response = await fetch("/api/studenti/elimina", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cf }),
          credentials: "include",
        });

        if (!response.ok) throw new Error("Errore nell'eliminazione");

        setStudenti((prev) => prev.filter((studente) => studente.cf !== cf));
      } catch (error) {
        console.error(error);
        alert("Non è stato possibile eliminare lo studente");
      }
    },
    [setStudenti]
  );

  return (
    <Box>
      <ButtonAppBar menuItems={menuItems}></ButtonAppBar>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tabella studenti">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Cognome</TableCell>
                <TableCell align="right">Data Nascita</TableCell>
                <TableCell align="right">Sesso</TableCell>
                <TableCell align="right">Codice Fiscale</TableCell>
                <TableCell align="right">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studenti.map((row) => (
                <TableRow
                  key={row.cf}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nome}
                  </TableCell>
                  <TableCell align="right">{row.cognome}</TableCell>
                  <TableCell align="right">{row.dataNascita}</TableCell>
                  <TableCell align="right">{row.sesso}</TableCell>
                  <TableCell align="right">{row.cf}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.cf)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
