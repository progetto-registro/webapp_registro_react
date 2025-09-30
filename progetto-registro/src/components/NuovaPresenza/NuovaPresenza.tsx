import type { MenuItem } from '../../types/menu';
import { useState, useEffect } from 'react';
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
  Checkbox,
  TextField,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type { Presenza, Lezione } from '../../types/presenza';
import type { Studente } from '../../types/studente';
import ButtonAppBar from '../ButtonAppBar';

type NuovaPresenzaProps = {
  menuItems: MenuItem[];
};

export default function NuovaPresenza({menuItems}: NuovaPresenzaProps){
  // Stato per la data selezionata (default: oggi)
  const [dataSelezionata, setDataSelezionata] = useState(dayjs());
  
  // Stato per la lista degli studenti
  const [studenti, setStudenti] = useState<Studente[]>([]);
  
  // Stato per le presenze (ora usa il tipo corretto)
  const [presenze, setPresenze] = useState<Presenza[]>([]);
  
  // Stato per le lezioni
  const [lezioni, setLezioni] = useState<Lezione[]>([]);

  // Stato per loading
  const [loading, setLoading] = useState(true);

  /* Funzione per caricare gli studenti dall'API */
  const caricaStudenti = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/studenti');
      const data = await response.json();
      setStudenti(data);
      
      // Inizializza le presenze per ogni studente con il tipo corretto
      const presenzeIniziali: Presenza[] = data.map((studente: Studente) => ({
        cf: studente.cf,
        ore: 0
      }));
      setPresenze(presenzeIniziali);
    } catch (error) {
      console.error('Errore nel caricamento studenti:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handler corretto per il cambio ore
  const cambioOreHandler = (cf: string, ore: number) => {
    setPresenze((prevPresenze) =>
      prevPresenze.map((presenza) =>
        presenza.cf === cf ? { ...presenza, ore: ore } : presenza
      )
    );
  };

  // Handler per il checkbox presenza/assenza
  const handlePresenzaChange = (cf: string, presente: boolean) => {
    cambioOreHandler(cf, presente ? 8 : 0); // 8 ore di default se presente, 0 se assente
  };

  // Handler per inserimento manuale delle ore
  const handleOreChange = (cf: string, ore: string) => {
    const oreNumeriche = parseInt(ore) || 0;
    cambioOreHandler(cf, oreNumeriche);
  };

  // Carica studenti all'avvio del componente
  useEffect(() => {
    caricaStudenti();
  }, []);

  // Carica lezioni all'avvio del componente
  useEffect(() => {
    const caricaLezioni = async () => {
      try {
        const response = await fetch('/api/lezioni');
        const data = await response.json();
        setLezioni(data);
      } catch (error) {
        console.error('Errore nel caricamento lezioni:', error);
      }
    };

    caricaLezioni();
  }, []);

  // Funzione per salvare le presenze
  const salvaPresenze = async () => {
    try {
      const nuovaLezione: Omit<Lezione, 'id'> = {
        dataLezione: dataSelezionata.format('YYYY-MM-DD'),
        studenti: presenze.filter(p => p.ore > 0) // Solo studenti con ore > 0
      };

      const response = await fetch('/api/lezioni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuovaLezione),
      });

      if (response.ok) {
        alert('Presenze salvate con successo!');
        // Resetta le presenze o naviga indietro
      } else {
        throw new Error('Errore nel salvataggio');
      }
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
      alert('Errore nel salvataggio delle presenze');
    }
  };

  if (loading) {
    return <Typography>Caricamento...</Typography>;
  }

  return (
  <Box>
    <ButtonAppBar menuItems={menuItems} />

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Nuova Presenza
        </Typography>

        {/* Selettore data */}
        <DatePicker
          label="Seleziona data"
          value={dataSelezionata}
          onChange={(nuovaData) => setDataSelezionata(nuovaData || dayjs())}
          sx={{ marginBottom: 2 }}
        />

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Cognome</TableCell>
                <TableCell>Presente</TableCell>
                <TableCell>Ore</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studenti.map((studente) => {
                const presenza = presenze.find(p => p.cf === studente.cf);
                const oreAttuali = presenza?.ore || 0;

                return (
                  <TableRow key={studente.cf}>
                    <TableCell>{studente.nome}</TableCell>
                    <TableCell>{studente.cognome}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={oreAttuali > 0}
                        onChange={(e) => handlePresenzaChange(studente.cf, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={oreAttuali}
                        onChange={(e) => handleOreChange(studente.cf, e.target.value)}
                        inputProps={{ min: 0, max: 24 }}
                        size="small"
                        disabled={oreAttuali === 0}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={salvaPresenze}>
            Salva Presenze
          </Button>
          <Button variant="outlined">
            Aggiungi Studente
          </Button>
          <Button variant="outlined" color="secondary">
            Annulla
          </Button>
        </Box>
      </Container>
    </LocalizationProvider>
  </Box>
);

};
