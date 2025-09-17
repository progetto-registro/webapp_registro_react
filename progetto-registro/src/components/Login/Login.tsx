import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState<string>('');  
  const [password, setPassword] = useState<string>('');   
  const notify = () => toast("Login non avvenuto, funzionalità non implementata");
  const navigate = useNavigate();

  //const handleLogin = () => {
    //console.log("Username:", username, "Password:", password);
  //};

  return (
    <div>
      <div className='back-button-container'>
        <Button 
          variant="text" 
          onClick={() => navigate(-1)} 
        >
          ← Indietro
        </Button>
      </div>

      <div className="login-container">
        <div>
          <div>
            <label htmlFor="username">Username</label>
          </div>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci username..."
            autoComplete="username"
          />
        </div>

        <div>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci password..."
            autoComplete="current-password"
          />
        </div>

        <Button 
          variant="contained" 
          onClick={notify} 
          className="button"
        >
          Login
        </Button>

        <ToastContainer />
      </div>
    </div>
  );
}
