import ButtonAppBar from "../ButtonAppBar";
import type { ButtonAppBarProps } from "../../types/menu";
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
  Fab,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Studente } from "../../types/studente";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "./Studenti.css";

export function Studenti({ menuItems }: ButtonAppBarProps) {
  const [studenti, setStudenti] = useState<Studente[]>([]);
  const navigate = useNavigate();
  const notify = {
    error: (msg: string) => toast.error(msg),
    success: (msg: string) => toast.success(msg),
  };

  useEffect(() => {
    const fetchStudenti = async () => {
      try {
        const res = await fetch("/api/studenti", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Errore nella risposta: " + res.status);

        const data: Studente[] = await res.json();
        console.log("Dati ricevuti:", data);
        setStudenti(data);
      } catch (err) {
        console.error("Errore nel recupero:", err);
        notify?.error("Impossibile caricare gli studenti");
      }
    };
    fetchStudenti();
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
        notify.success("Studente eliminato con successo!");
      } catch (error) {
        console.error(error);
        notify.error("Studente non eliminato");
      }
    },
    [setStudenti]
  );

  const goToNuovoStudente = () => {
    navigate("/nuovo-studente");
  };

  return (
    <Box>
      <ButtonAppBar menuItems={menuItems}></ButtonAppBar>

      <Box className="studenti-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tabella studenti">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Cognome</TableCell>
                <TableCell align="right">Data Nascita</TableCell>
                <TableCell align="right">Sesso</TableCell>
                <TableCell align="right">Codice Fiscale</TableCell>
                <TableCell align="right"></TableCell>
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
      <Fab
        color="primary"
        aria-label="add"
        onClick={goToNuovoStudente}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>
      <ToastContainer />
    </Box>
  );
}
