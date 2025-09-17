import dayjs from "dayjs";


export type Studente = {
    nome : string;
    cognome : string;
    dataNascita : string;
    sesso : string;
    codiceFiscale : dayjs.Dayjs | string;
    email : string;
    password : string;

}