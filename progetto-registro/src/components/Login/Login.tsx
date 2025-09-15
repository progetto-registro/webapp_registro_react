import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  return (
    <>
      <div className='login-container'>
        <div>
          <div>
            <label htmlFor="username">Username:</label>
          </div>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Inserisci username...'
            autoComplete='username'
          />
        </div>

        <div>
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Inserisci password...'
            autoComplete='password'
          />
        </div>

        <Button variant="contained">
          Login
        </Button>
      </div>
    </>
  );
}