import type { MenuItem } from "../../types/menu";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { Lezione } from "../../types/presenza";
import type { Studente } from "../../types/studente";
import ButtonAppBar from "../ButtonAppBar";
import { toast } from "react-toastify";

type NuovaPresenzaProps = {
  menuItems: MenuItem[];
};

type PresenzaInput = {
  cf: string;
  ore: number;
};

export default function NuovaPresenza({ menuItems }: NuovaPresenzaProps) {
  const navigate = useNavigate();

  const [dataSelezionata, setDataSelezionata] = useState<Dayjs>(dayjs());
  const [studenti, setStudenti] = useState<Studente[]>([]);
  const [lezioni, setLezioni] = useState<Lezione[]>([]);
  const [presenze, setPresenze] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // fetch studenti
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

  // fetch lezioni
  useEffect(() => {
    const fetchLezioni = async () => {
      try {
        const res = await fetch("/api/lezioni", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Errore caricamento lezioni");
        const data: Lezione[] = await res.json();
        setLezioni(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLezioni();
  }, []);

  // quando cambia la data, carico eventuali ore già inserite
  useEffect(() => {
    const lezioneEsistente = lezioni.find(
      (lez) => lez.dataLezione === dataSelezionata.format("YYYY-MM-DD")
    );
    if (lezioneEsistente) {
      const iniziali: Record<string, number> = {};
      lezioneEsistente.studenti.forEach((p) => {
        iniziali[p.cf] = p.ore;
      });
      setPresenze(iniziali);
    } else {
      setPresenze({});
    }
  }, [dataSelezionata, lezioni]);

  const handleOreChange = (cf: string, value: string) => {
    setPresenze((prev) => ({
      ...prev,
      [cf]: Number(value),
    }));
  };

  const handleSalva = async () => {
    const payload = {
      dataLezione: dataSelezionata.format("YYYY-MM-DD"),
      studenti: studenti.map((s) => ({
        cf: s.cf,
        ore: presenze[s.cf] || 0,
      })),
    };

    try {
      const res = await fetch("/api/lezioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Errore salvataggio lezione");

      toast.success("Presenze salvate con successo!");
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom>
            Nuova Presenza
          </Typography>

          <DatePicker
            label="Seleziona data"
            value={dataSelezionata}
            onChange={(nuovaData) =>
              setDataSelezionata(nuovaData || dayjs())
            }
            sx={{ marginBottom: 2 }}
          />

          <TableContainer component={Paper} sx={{ mt: 3 }}>
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
                          value={presenze[studente.cf] || ""}
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

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
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
      </LocalizationProvider>
    </Box>
  );
}
