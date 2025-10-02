import { useState, useEffect } from "react";
import ButtonAppBar from "../ButtonAppBar";
import type { ButtonAppBarProps } from "../../types/menu";
import { useNavigate } from "react-router-dom";
import type { Lezione, PresenzaEstesa } from "../../types/presenza";
import { 
  Button, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Fab, 
  IconButton,
  DialogTitle,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Registro({ menuItems }: ButtonAppBarProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [presenze, setPresenze] = useState<PresenzaEstesa[]>([]);
  const [editingPresenza, setEditingPresenza] = useState<PresenzaEstesa | null>(null);
  const [newOre, setNewOre] = useState<number>(0);

  const notify = {
  error: (msg: string) => toast.error(msg),
  success: (msg: string) => toast.success(msg),
  };


  const handleOpenDialog = (presenza: PresenzaEstesa) => {
    setEditingPresenza(presenza);
    setNewOre(presenza.ore);
    setOpen(true);
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lezioniRes, studentiRes] = await Promise.all([
          fetch("/api/lezioni", {
            credentials: "include",
          }),
          fetch("/api/studenti", {
            credentials: "include",
          }),
        ]);

        if (!lezioniRes.ok) {
          throw new Error("Errore nel fetch delle lezioni");
        }
        if (!studentiRes.ok) {
          throw new Error("Errore nel fetch degli studenti");
        }

        const lezioniData: Lezione[] = await lezioniRes.json();
        const elencoStudenti: { cf: string; nome: string; cognome: string }[] =
          await studentiRes.json();

        const row = lezioniData.flatMap((lezione) =>
        lezione.studenti.map((presenzaStudente) => {
        const datiStudente = elencoStudenti.find(
        (studenteInfo) => studenteInfo.cf === presenzaStudente.cf
        );

        return {
          idLezione: lezione.id, 
          cf: presenzaStudente.cf,
          nome: datiStudente!.nome,
          cognome: datiStudente!.cognome,
          dataLezione: lezione.dataLezione,
          ore: presenzaStudente.ore,
        };
        })
        );


        setPresenze(row);
        console.log("presenze caricate : ", row);
      } catch (error) {
        console.error("Errore nel fetch:", error);
        alert("Errore nel caricamento dei dati");
      }
    };

    fetchData();
  }, []);

  const handleUpdateOre = useCallback(async () => {
  if (!editingPresenza) return;

  //controllo 
  if(!Number.isInteger(newOre) || newOre < 0 || newOre > 8) {
    notify.error("Non valido");
    return;
  }

  try {
    const response = await fetch("/api/lezioni/modifica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: editingPresenza.idLezione, // devo avere l'id della lezione anche se non l'ho mai considerato
        dataLezione: editingPresenza.dataLezione,
        studenti: [
          {
            cf: editingPresenza.cf,
            ore: newOre
          }
        ]
      }),
    });

    if (!response.ok) throw new Error("Errore nella modifica");

    setPresenze((prev) =>
      prev.map((p) =>
        p.cf === editingPresenza.cf && p.dataLezione === editingPresenza.dataLezione
          ? { ...p, ore: newOre }
          : p
      )
    );

    setOpen(false);
    setEditingPresenza(null);

    notify.success("Ore aggiornate con successo!");
    
  } catch (error) {
    console.error(error);
    notify.error("Impossibile modificare le ore");
  }
}, [editingPresenza, newOre]);


  return (
    <Box>
      <ButtonAppBar menuItems={menuItems}></ButtonAppBar>

      <Box sx={{ pt: 6 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="registro presenze">
            <TableHead>
              <TableRow>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Cognome</TableCell>
                <TableCell align="right">Data Lezione</TableCell>
                <TableCell align="right">Ore Presenza </TableCell>
                <TableCell align="right">Stato</TableCell>
                <TableCell align="right">Modifica</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {presenze.map((row) => (
                <TableRow
                  key={row.cf + "-" + row.dataLezione}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  
                  <TableCell align="right">{row.nome}</TableCell>
                  <TableCell align="right">{row.cognome}</TableCell>
                  <TableCell align="right">{row.dataLezione}</TableCell>
                  <TableCell align="right">{row.ore}</TableCell>
                  {/*Colonna con colorazione*/}
                  <TableCell
                  align="right"
                  sx={{
                  bgcolor: row.ore >= 1 && row.ore <= 8 ? "rgba(2, 208, 88, 0.4)" : "rgba(242, 72, 60, 0.4)",
                  }}>
                  {row.ore >= 1 && row.ore <= 8 ? "Presente":"Assente"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="info"
                      onClick={() => handleOpenDialog(row)}
                    >
                      <EditIcon />
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
      </Box>
      {/*Dialog per modificare ore */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Modifica ore</DialogTitle>
        <DialogContent>
          <TextField
            label="Ore di presenza"
            type="number"
            fullWidth
            margin="dense"
            value={newOre === 0 ? "" : newOre} // mostra vuoto invece di 0
            onChange={(e) => setNewOre(Number(e.target.value))}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annulla</Button>
          <Button onClick={handleUpdateOre} variant="contained" color="primary" disabled={!Number.isInteger(newOre) || newOre < 0 || newOre >8}>
            Salva
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => navigate("/nuova-presenza")}
      >
        <AddIcon />
      </Fab>
      

    <ToastContainer></ToastContainer>
    </Box>
    
  );
}
