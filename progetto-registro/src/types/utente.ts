export type UtenteLogin = {
    nome: string;
    cognome: string;
};

export type Sesso = 'female' | 'male' | 'other';

export type Utente = {
    nome: string;
    cognome: string;
    sesso: Sesso;
    dataNascita: string; 
    codiceFiscale: string;
    email: string;
    password: string;
    confermaPassword: string;
};