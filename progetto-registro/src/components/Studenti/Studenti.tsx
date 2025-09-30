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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Studente } from "../../types/studente";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

export function Studenti({ menuItems }: ButtonAppBarProps) {
  const [studenti, setStudenti] = useState<Studente[]>([]);
  const [newStudente, setNewStudente] = useState<Partial<Studente>>({});
  const [open, setOpen] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/studenti/nuovo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudente),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Errore nell'aggiunta dello studente");

      const savedStudente: Studente = await res.json();
      setStudenti((prev) => [...prev, savedStudente]);
      setOpen(false);
      setNewStudente({});
      toast.success("Studente registrato!");
    } catch (err) {
      console.error(err);
      toast.error("Errore nella registrazione dello studente");
    }
  };
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

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Nuovo Studente</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="dense"
            value={newStudente.nome || ""}
            onChange={(e) =>
              setNewStudente({ ...newStudente, nome: e.target.value })
            }
          />
          <TextField
            label="Cognome"
            fullWidth
            margin="dense"
            value={newStudente.cognome || ""}
            onChange={(e) =>
              setNewStudente({ ...newStudente, cognome: e.target.value })
            }
          />
          <TextField
            label="Data di Nascita"
            fullWidth
            margin="dense"
            value={newStudente.dataNascita || ""}
            onChange={(e) =>
              setNewStudente({ ...newStudente, dataNascita: e.target.value })
            }
          />
          <TextField
            select
            label="Sesso"
            fullWidth
            margin="dense"
            value={newStudente.sesso || ""}
            onChange={(e) =>
              setNewStudente({
                ...newStudente,
                sesso: e.target.value as "M" | "F",
              })
            }
          >
            <MenuItem value="M">Maschio</MenuItem>
            <MenuItem value="F">Femmina</MenuItem>
          </TextField>
          <TextField
            label="Codice Fiscale"
            fullWidth
            margin="dense"
            value={newStudente.cf || ""}
            onChange={(e) =>
              setNewStudente({ ...newStudente, cf: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annulla</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Salva
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
