import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import { Box, TextField, Typography } from "@mui/material";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const submitLogin = async () => {
    if (!username || !password) {
      toast.error("Inserisci username e password");
      return;
    }

    const toastLoad = toast.loading("Login in corso...");

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      toast.update(toastLoad, {
        render: `Benvenuto ${response.data.nome}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/home");
    } catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.update(toastLoad, {
              render: "Username o password mancanti (errore 400)",
              type: "error",
              isLoading: false,
              autoClose: 4000,
            });
            break;
          case 404:
            toast.update(toastLoad, {
              render: "Credenziali errate: controlla username e password (404)",
              type: "error",
              isLoading: false,
              autoClose: 4000,
            });
            break;
          case 500:
            toast.update(toastLoad, {
              render: "Errore interno del server (500)",
              type: "error",
              isLoading: false,
              autoClose: 4000,
            });
            break;
          default:
            toast.update(toastLoad, {
              render: `Errore imprevisto (${err.response.status})`,
              type: "error",
              isLoading: false,
              autoClose: 4000,
            });
        }
      } else if (err.request) {
        // nessuna risposta dal server
        toast.update(toastLoad, {
          render: "Impossibile connettersi al server. Verifica che sia avviato",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      } else {
        // errore generico in axios
        toast.update(toastLoad, {
          render: `Errore: ${err.message}`,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <Box>
      <Box className="back-button-container">
        <Button variant="text" onClick={() => navigate(-1)}>
          ← Indietro
        </Button>
      </Box>

      <Box className="login-container">
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Login
        </Typography>

        <Box>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci username..."
            autoComplete="username"
            required
          />
        </Box>

        <Box>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci password..."
            required
          />
        </Box>

        <Button variant="contained" onClick={submitLogin} className="button">
          Login
        </Button>

        <ToastContainer />
      </Box>
    </Box>
  );
}
