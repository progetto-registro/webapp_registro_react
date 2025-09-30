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
import ButtonAppBar from "../ButtonAppBar";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import type { Studente } from "../../types/studente";

type NuovaPresenzaProps = {
  menuItems: MenuItem[];
};

export default function NuovaPresenza({ menuItems }: NuovaPresenzaProps) {
  const navigate = useNavigate();

  const [studenti, setStudenti] = useState<Studente[]>([]);
  const [orePresenza, setOrePresenza] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const dataOggi = dayjs().format("DD-MM-YYYY");

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
  const payload = {
    dataLezione: dayjs().format("DD/MM/YYYY"), // formato come nel JSON
    studenti: studenti.map((s) => ({
      cf: s.cf,
      ore: orePresenza[s.cf] || 0,
    })),
  };

  try {
    const res = await fetch("/api/lezioni", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Errore salvataggio");

    toast.success("Presenze salvate in lezioni.json!");
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
          Pagina per aggiungere presenze degli studenti per la lezione odierna
          ({dataOggi})
        </Typography>

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
    </Box>
  );
}
