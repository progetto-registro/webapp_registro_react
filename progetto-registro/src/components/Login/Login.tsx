import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import './Login.css';
import { Box, TextField, Typography } from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState<string>('');  
  const [password, setPassword] = useState<string>('');   
  const navigate = useNavigate();

const submitLogin = async () => {
  if (!username || !password) {
    toast.error("Inserisci username e password");
    return;
  }

  const toastLoad = toast.loading("Login in corso...");

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include" // invia cookie al backend
    });

    if (response.ok) {
      const data = await response.json();
      toast.update(toastLoad, {
        render: `Benvenuto ${data.nome}`,
        type: "success",
        isLoading: false,
        autoClose: 3000
      }); 
      navigate("/home");
    } else {
      const errorText = await response.text();
      toast.error(errorText);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Errore di connessione al server";
    toast.update(toastLoad, {
      render: errorMessage,
      type: "error",
      isLoading: false,
      autoClose: 3000
    });
  }
};

  return (
    <Box>
      <Box className='back-button-container'>
        <Button 
          variant="text" 
          onClick={() => navigate(-1)} 
        >
          ← Indietro
        </Button>
      </Box>

      <Box className="login-container">
        <Typography variant='h5' textAlign='center' fontWeight="bold">
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

        <Button 
          variant="contained" 
          onClick={submitLogin} 
          className="button"
        >
          Login
        </Button>

        <ToastContainer />
      </Box>
    </Box>
  );
}
