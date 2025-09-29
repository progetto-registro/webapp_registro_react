import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import './SignUp.css';




export default function SignUp()
{
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [sesso, setSesso] = useState("");
    const [dataNascita, setDataNascita] = useState("");
    const [codiceFiscale, setCodiceFiscale] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confermaPassword, setConfermaPassword] = useState("");
    const [date, setDate] = useState("2024-06-07");

    const navigate = useNavigate();

    // const handleSubmit = (e: React.FormEvent) => {
   

    return(

        <>
        <Box className="back-button-container">
          <Button type="submit" variant="text" color="primary" onClick={() => navigate(-1)}>
            ← Indietro
          </Button>
        </Box>
        
        <Box
        component="form"
       // onSubmit={handleSubmit}
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
          value={nome}
          //onChange={(e) => setNome(e.target.value)}
          required
        />
        <TextField
          label="Cognome"
          value={cognome}
           // onChange={(e) => setCognome(e.target.value)}
          required
        />

    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
    </FormControl>


    <TextField
        label="Pick a date"
        type="date"         
        value={date}
        //onChange={(e) => setDate(e.target.value)}
    
        required
      />
    
        <TextField
          label="Email"
          type="email"
          value={email}
         // onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <TextField
          label="Password"
          type="password"
          value={password}
          //onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <TextField
          label="Conferma Password"
          type="password"
          value={confermaPassword}
         // onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
  
        
        <Button type="submit" variant="contained" color="primary">
          Registrati
        </Button>
      </Box>
      </>
    )



}