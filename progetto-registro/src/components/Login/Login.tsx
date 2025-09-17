import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import './Login.css';
import { Box, TextField, Typography } from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState<string>('');  
  const [password, setPassword] = useState<string>('');   
  const notify = () => toast("Login non avvenuto, funzionalità non implementata");
  const navigate = useNavigate();

  //const handleLogin = () => {
    //console.log("Username:", username, "Password:", password);
  //};

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
        <Box>
          <Box>
            <label htmlFor="username">
              <Typography>Username</Typography>
            </label>
          </Box>
          <TextField 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci username..."
            autoComplete="username"
            required
          />
        </Box>

        <Box>
          <Box>
            <Typography>Password</Typography>
          </Box>
          <TextField 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci password..."
            autoComplete="current-password"
            required
          />
        </Box>

        <Button 
          variant="contained" 
          onClick={notify} 
          className="button"
        >
          Login
        </Button>

        <ToastContainer />
      </Box>
    </Box>
  );
}
