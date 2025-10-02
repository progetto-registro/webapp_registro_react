import type { MenuItem } from "../../types/menu";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import ButtonAppBar from "../ButtonAppBar";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import type { Studente } from "../../types/studente";
import type { Lezione } from "../../types/presenza";

type NuovaPresenzaProps = {
  menuItems: MenuItem[];
};

export default function NuovaPresenza({ menuItems }: NuovaPresenzaProps) {
  const [dataLezione, setDataLezione] = useState<dayjs.Dayjs | null>(dayjs());

  const navigate = useNavigate();

  const [studenti, setStudenti] = useState<Studente[]>([]);
  const [orePresenza, setOrePresenza] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const dataOggi = dayjs().format("DD/MM/YYYY");

  // Carico studenti
  useEffect(() => {
    const fetchStudenti = async () => {
      try {
        const res = await fetch("/api/studenti", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Errore caricamento studenti");
        const data: Studente[] = await res.json();
        setStudenti(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Impossibile caricare gli studenti");
        setLoading(false);
      }
    };
    fetchStudenti();
  }, []);

  const handleOreChange = (cf: string, value: string) => {
    setOrePresenza((prev) => ({
      ...prev,
      [cf]: Number(value),
    }));
  };

 const handleSalva = async () => {
  const nuovaLezione: Lezione = {
    id: (dataLezione ?? dayjs()).valueOf(),
    dataLezione: (dataLezione ?? dayjs()).format("DD/MM/YYYY"),
    studenti: studenti.map((s) => ({
      cf: s.cf,
      ore: orePresenza[s.cf] || 0,
    })),
  };

  try {
    const res = await fetch("/api/lezioni/nuova", {
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(nuovaLezione),
    });

    if (!res.ok) throw new Error("Errore salvataggio");

    toast.success("Nuova lezione salvata!");
    navigate("/registro");
  } catch (err) {
    console.error(err);
    toast.error("Errore nel salvataggio");
  }
};



  if (loading) return <Typography>Caricamento...</Typography>;

  return (
    <Box>
      <ButtonAppBar menuItems={menuItems} />

      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Aggiungi Presenze
        </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateTimePicker
    label="Data e ora lezione"
    value={dataLezione}
    onChange={(newValue) => setDataLezione(newValue)}
  />
</LocalizationProvider>

        <TableContainer component={Paper} 
        sx={{ 
          mt: 3, 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
          border: '1px solid rgb(187, 187, 187)'
          }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Cognome</TableCell>
                <TableCell align="center">Ore</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studenti.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Nessuno studente trovato
                  </TableCell>
                </TableRow>
              ) : (
                studenti.map((studente) => (
                  <TableRow key={studente.cf}>
                    <TableCell>{studente.nome}</TableCell>
                    <TableCell>{studente.cognome}</TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        value={orePresenza[studente.cf] || ""}
                        onChange={(e) =>
                          handleOreChange(studente.cf, e.target.value)
                        }
                        inputProps={{ min: 0 }}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: "flex", gap: 2}}>
          <Button variant="contained" onClick={handleSalva}>
            Salva Presenze
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Annulla
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
