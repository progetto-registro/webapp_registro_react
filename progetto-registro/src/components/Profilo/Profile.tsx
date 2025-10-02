import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import PasswordField from "../PasswordField";
import ButtonAppBar from "../ButtonAppBar";
import type { ButtonAppBarProps } from "../../types/menu";
import type { Utente } from "../../types/utente";
import { useNavigate } from "react-router-dom";

export function Profile({ menuItems }: ButtonAppBarProps) {
  //trovare un modo per avere l'utente
  const initialUser: Utente = {
    nome: "Pippo",
    cognome: "Baudo",
    sesso: "M",
    dataNascita: "07/06/1936",
    cf: "BDAPPP36H07C351U",
    mail: "pippobaudo@gmail.com",
    password: "baudo",
    confermaPassword: "",
  };
  const navigate = useNavigate();
  const [utente, setUtente] = useState<Utente>(initialUser);

  const notify = {
    error: (msg: string) => toast.error(msg),
    success: (msg: string) => toast.success(msg),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUtente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (utente.password && utente.password !== utente.confermaPassword) {
      notify.error("Le password non coincidono!");
      return;
    }
    if (utente.password && utente.password.length < 8) {
      notify.error("La password deve essere di almeno 8 caratteri!");
      return;
    }
    if (!utente.mail.includes("@")) {
      notify.error("Email non valida!");
      return;
    }

    const formattedDate = utente.dataNascita
      ? utente.dataNascita.split("-").reverse().join("/")
      : initialUser.dataNascita.split("-").reverse().join("/");

    const payload = {
      nome: utente.nome || initialUser.nome,
      cognome: utente.cognome || initialUser.cognome,
      sesso: utente.sesso,
      dataNascita: formattedDate,
      cf: initialUser.cf,
      mail: utente.mail || initialUser.mail,
      username: utente.nome || initialUser.nome,
      password: utente.password || initialUser.password,
    };

    try {
      const res = await fetch("/api/auth/modifica", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Errore generico");
      }

      notify.success("Profilo aggiornato con successo!");
      //trovare un modo per far visualizzare il tostify poi navigate
      navigate("/home");
    } catch (err) {
      console.error("Errore nella modifica:", err);
      notify.error("Errore sconosciuto");
    }
  };
  return (
    <Box>
      <ButtonAppBar menuItems={menuItems} />
      <Paper elevation={3} className="signup-paper">
        <Box
          component="form"
          className="signup-container"
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            Modifica Profilo
          </Typography>

          <TextField
            label="Nome"
            name="nome"
            value={utente.nome}
            onChange={handleChange}
          />
          <TextField
            label="Cognome"
            name="cognome"
            value={utente.cognome}
            onChange={handleChange}
          />

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              name="sesso"
              value={utente.sesso}
              onChange={handleChange}
            >
              <FormControlLabel value="F" control={<Radio />} label="Femmina" />
              <FormControlLabel value="M" control={<Radio />} label="Maschio" />
            </RadioGroup>
          </FormControl>

          <TextField
            type="date"
            name="dataNascita"
            value={utente.dataNascita}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            type="email"
            name="mail"
            value={utente.mail}
            onChange={handleChange}
          />

          <PasswordField
            name="password"
            label="Password"
            value={utente.password}
            onChange={handleChange}
          />
          <PasswordField
            name="confermaPassword"
            label="Conferma Password"
            value={utente.confermaPassword}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Conferma Modifiche
          </Button>
          <ToastContainer />
        </Box>
      </Paper>
    </Box>
  );
}
