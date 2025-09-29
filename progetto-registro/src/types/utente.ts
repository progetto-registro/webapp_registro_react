export type UtenteLogin = {
    nome: string;
    cognome: string;
};



export type Utente = {
    nome: string;
    cognome: string;
    sesso: 'F' | 'M';
    dataNascita: string; 
    cf: string;
    mail: string;
    password: string;
    confermaPassword: string;
};