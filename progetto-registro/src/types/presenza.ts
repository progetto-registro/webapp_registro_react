export type Presenza = {
  cf: string; // riferimento allo studente
  ore: number; // numero di ore presenti
};

export type Lezione = {
  id: number;
  dataLezione: string;
  studenti: Presenza[];
};

export type PresenzaEstesa = Presenza & {
  nome: string;
  cognome: string;
  dataLezione: string;
  idLezione: number;
};
