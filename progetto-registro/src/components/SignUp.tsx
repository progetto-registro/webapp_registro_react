import React, { useState } from "react";

import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import PasswordField from "./PasswordField";
import type { Utente } from "../types/utente";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();

  const [utente, setUtente] = useState<Utente>({
    nome: "",
    cognome: "",
    sesso: "M",
    dataNascita: "",
    cf: "",
    mail: "",
    password: "",
    confermaPassword: "",
  });

  const notify = {
    error: (msg: string) => toast.error(msg),
    success: (msg: string) => toast.success(msg),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUtente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (utente.password !== utente.confermaPassword) {
      notify.error("Le password non coincidono!");
      return;
    }
    if (utente.password.length < 8) {
      notify.error("La password deve essere di almeno 8 caratteri!");
      return;
    }
    if (!utente.mail.includes("@")) {
      notify.error("Email non valida!");
      return;
    }
    if (!utente.nome || !utente.cognome) {
      notify.error("Nome e cognome sono obbligatori!");
      return;
    }
    if (
      !utente.dataNascita ||
      utente.dataNascita > new Date().toISOString().split("T")[0]
    ) {
      notify.error("Data di nascita non valida!");
      return;
    }
    const formattedDate = utente.dataNascita.split("-").reverse().join("/");



      if(utente.cf && utente.cf.length !== 16) {
        notify.error("Codice fiscale non valido!");
        return;
      }
    

      const payload = {
        nome: utente.nome,
        cognome: utente.cognome,
        sesso: utente.sesso,
        dataNascita: formattedDate,
        cf: utente.cf, 
        mail: utente.mail,
        password: utente.password,
        username: utente.nome       
      };

    
      try {
        const response = await axios.put('/api/auth/signup', payload);
        console.log(response);
        //const token = response.data.token; 
        //localStorage.setItem("token", token); 

        if(response.status === 200)
        {
          notify.success("Registrazione avvenuta con successo!");
          setTimeout(() => {
            navigate("/login"); 
          }, 2000);
          
        }
      } 
      catch (error: any) {
          if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Messaggio di errore dal server:", error.response.data);
        
            // La richiesta è stata fatta e il server ha risposto con uno status code
            //error.response.data contiene il messaggio di errore dal server
            const errMsg = error.response.data || "Errore generico";
            notify.error(errMsg);
          } else if (error.request) {
            // La richiesta è stata fatta, ma non è arrivata risposta
            notify.error("Nessuna risposta dal server. Controlla la connessione.");
          } else {
            // Errore nell’impostare la richiesta
            notify.error("Errore interno: " + error.message);
          }
          console.log(error?.response?.status ?? error);
        }
  };

  return (
    <>
      <Box className="back-button-container">
        <Button
          type="submit"
          variant="text"
          color="primary"
          onClick={() => navigate(-1)}
        >
          ← Indietro
        </Button>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          margin: "auto",
          mt: 5,
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Registrazione
        </Typography>

        <TextField
          label="Nome"
          name="nome"
          value={utente.nome}
          onChange={handleChange}
          required
        />
        <TextField
          label="Cognome"
          name="cognome"
          value={utente.cognome}
          onChange={handleChange}
          required
        />
        <TextField
          label="Codice Fiscale"
          name="cf"
          value={utente.cf}
          onChange={handleChange}
        />

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="sesso"
            value={utente.sesso}
            onChange={handleChange}
          >
            <FormControlLabel value="F" control={<Radio />} label="Femmina" />
            <FormControlLabel value="M" control={<Radio />} label="Maschio" />

            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="other"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          type="date"
          name="dataNascita"
          value={utente.dataNascita}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          type="email"
          name="mail"
          value={utente.mail}
          onChange={handleChange}
          required
        />

        <PasswordField
           name="password"
           label="Password"
           value={utente.password}
           onChange={handleChange}
           required
        />

        <PasswordField
          name="confermaPassword"
          label="Conferma Password"
          value={utente.confermaPassword}
          onChange={handleChange}
          required
        />


        <Button type="submit" variant="contained" color="primary">
          Registrati
        </Button>
        <ToastContainer />
      </Box>
    </>
  );
}
    
