import ButtonAppBar from "./ButtonAppBar";
import Box from '@mui/material/Box';
import type { ButtonAppBarProps } from '../types/menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import type { Studente } from "../types/studente";

export function Studenti({ menuItems }: ButtonAppBarProps) {
 
  const [studenti, setStudenti] = useState<Studente[]>([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/api/studenti")
      .then(res => {
        if(!res.ok) throw new Error('Errore nella risposta');
        return res.json();
      })
      .then((data: Studente[]) => setStudenti(data))
      .catch(err => console.error('Errore nel recupero', err))
  }, []);


  return (
    <Box>

      <ButtonAppBar menuItems={menuItems}></ButtonAppBar>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Cognome</TableCell>
                <TableCell align="right">Data Nascita</TableCell>
                <TableCell align="right">Sesso</TableCell>
                <TableCell align="right">Codice Fiscale</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studenti.map((row) => (
                <TableRow
                  key={row.cf}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.cf}
                  </TableCell>
                  <TableCell align="right">{row.nome}</TableCell>
                  <TableCell align="right">{row.cognome}</TableCell>
                  <TableCell align="right">{row.dataNascita}</TableCell>
                  <TableCell align="right">{row.cf}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </Box>
  );
}