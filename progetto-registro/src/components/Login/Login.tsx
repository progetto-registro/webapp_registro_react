import Button from '@mui/material/Button';

export default function Login() {



  return (
    <>
        <div className='login-container'>
          <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          <Button variant="contained">Login</Button>
        </div>  
    </>
  );
}