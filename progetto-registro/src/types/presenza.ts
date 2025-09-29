export type Presenza = {
  cf: string; // riferimento allo studente
  ore: number; // numero di ore presenti
};

export type Lezione = {
  id: number;
  dataLezione: string;
  studenti: Presenza[];
};
