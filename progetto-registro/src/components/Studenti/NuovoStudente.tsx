import ButtonAppBar from "../ButtonAppBar";
import type { ButtonAppBarProps } from "../../types/menu";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import type { Studente } from "../../types/studente";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NuovoStudente.css";

export function NuovoStudente({ menuItems }: ButtonAppBarProps) {
  const navigate = useNavigate();
  const notify = {
    error: (msg: string) => toast.error(msg),
    success: (msg: string) => toast.success(msg),
  };
  const [loading, setLoading] = useState(false);
  const [newStudente, setNewStudente] = useState<Partial<Studente>>({
    nome: "",
    cognome: "",
    dataNascita: "",
    sesso: undefined,
    cf: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewStudente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!newStudente.nome) {
      notify.error("Inserire il nome dello studente");
      return;
    }
    if (!newStudente.cognome) {
      notify.error("Inserire il cognome dello studente");
      return;
    }
    if (!newStudente.dataNascita) {
      notify.error("Inserire la data di nascita dello studente");
      return;
    }
    const oggi = new Date();
    const nascita = new Date(newStudente.dataNascita);
    let eta = oggi.getFullYear() - nascita.getFullYear();
    const m = oggi.getMonth() - nascita.getMonth();
    if (m < 0 || (m === 0 && oggi.getDate() < nascita.getDate())) {
      eta--;
    }

    if (eta < 18 || eta > 100) {
      notify.error(
        "L'età dello studente deve essere compresa tra 18 e 100 anni"
      );
      return;
    }
    if (!newStudente.sesso) {
      notify.error("Inserire il sesso dello studente");
      return;
    }
    if (!newStudente.cf) {
      notify.error("Inserire il codice fiscale dello studente");
      return;
    }
    if (newStudente.cf.length != 16) {
      notify.error("Codice fiscale non valido");
      return;
    }

    const formattedDate = newStudente.dataNascita
      .split("-")
      .reverse()
      .join("/");
    const payload: Studente = {
      nome: newStudente.nome,
      cognome: newStudente.cognome,
      dataNascita: formattedDate,
      sesso: newStudente.sesso,
      cf: newStudente.cf,
    };

    console.log("Invio payload:", payload);
    setLoading(true);
    try {
      const res = await fetch("/api/studenti/nuovo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const text = await res.text();
      console.log("Response status:", res.status);
      console.log("Response body:", text);

      if (!res.ok) {
        if (
          res.status === 400 &&
          text.includes(
            "E' già presente un studente a sistema con lo stesso codice fiscale"
          )
        ) {
          notify.error("Codice fiscale già registrato");
        } else {
          notify.error(
            text || "Errore durante la registrazione dello studente"
          );
        }
        return;
      }

      notify.success("Studente registrato!");
      setNewStudente({
        nome: "",
        cognome: "",
        dataNascita: "",
        sesso: undefined,
        cf: "",
      });
      navigate("/studenti");
    } catch (err) {
      console.error("Errore nella registrazione:", err);
      notify.error("Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <ButtonAppBar menuItems={menuItems} />

      <Box className="studente-container">
        <Typography variant="h5" gutterBottom>
          Nuovo Studente
        </Typography>

        <TextField
          type="text"
          name="nome"
          label="Nome"
          fullWidth
          margin="dense"
          value={newStudente.nome}
          onChange={handleChange}
          required
        />

        <TextField
          type="text"
          name="cognome"
          label="Cognome"
          fullWidth
          margin="dense"
          value={newStudente.cognome}
          onChange={handleChange}
          required
        />

        <TextField
          type="date"
          name="dataNascita"
          value={newStudente.dataNascita}
          onChange={handleChange}
          required
        />

        <TextField
          select
          name="sesso"
          label="Sesso"
          fullWidth
          margin="dense"
          value={newStudente.sesso || ""}
          onChange={handleChange}
          required
        >
          <MenuItem value="M">Maschio</MenuItem>
          <MenuItem value="F">Femmina</MenuItem>
        </TextField>

        <TextField
          type="text"
          name="cf"
          label="Codice Fiscale"
          fullWidth
          margin="dense"
          value={newStudente.cf}
          onChange={handleChange}
          required
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={() => navigate("/studenti")} sx={{ mr: 1 }}>
            Annulla
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Salva
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
