import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { Box, Link, TextField, Typography } from '@mui/material';
import './Login.css';
import axios from 'axios';
import PasswordField from '../PasswordField';


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
      const response = await axios.post("/api/auth/login",
        { username, password }
      );

     toast.update(toastLoad, {
        render: `Benvenuto ${response.data.nome}`,
        type: "success",
        isLoading: false,
        autoClose: 3000
      }); 
      
      if(response.status === 200)
        {
          setTimeout(() => {
            navigate("/home"); 
          }, 2000);
          
        }
    }  

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.update(toastLoad, {
              render: "Username e/o password mancanti. Prova a registrarti se non l'hai ancora fatto",
              type: "error",
              isLoading: false,
              autoClose: 4000
            });
            break;
          case 404:
            toast.update(toastLoad, {
              render: (err.response.data),
              type: "error",
              isLoading: false,
              autoClose: 4000
            });
            break;
          case 500:
            toast.update(toastLoad, {
              render: (err.response.data),
              type: "error",
              isLoading: false,
              autoClose: 4000
            });
            break;
          default:
            toast.update(toastLoad, {
              render: `Errore generico (${err.response.status})`,
              type: "error",
              isLoading: false,
              autoClose: 4000
            });
        }
      } else if (err.request) {
        // nessuna risposta dal server
        toast.update(toastLoad, {
          render: "Impossibile connettersi al server. Verifica che sia avviato",
          type: "error",
          isLoading: false,
          autoClose: 4000
        });
      } else {
        // errore in axios
        toast.update(toastLoad, {
          render: `Errore: ${err.message}`,
          type: "error",
          isLoading: false,
          autoClose: 4000
        });
      }
    }
  };

  return (
    <Box className="login-page">
      <Box className='back-button-container'>
        <Button
          variant="text" 
          onClick={() => navigate(-1)} 
        >
          ← Indietro
        </Button>
      </Box>

      <Box className="login-container">
        <Typography variant='h4' textAlign='center' fontWeight="bold">
          Benvenuto
        </Typography>

        <Box className="username-field">
          <TextField 
            label="Username"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </Box>
      
        <Box>
          <PasswordField 
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <Box className="signup-link">
          Non hai un account?
          <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/signup");}}
          >
          Registrati
          </Link>
        </Box>

        <ToastContainer />
      </Box>
    </Box>
  );
}
