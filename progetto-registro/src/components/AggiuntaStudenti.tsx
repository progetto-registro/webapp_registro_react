import { useState, useEffect } from 'react';
import axios from 'axios';

// Tipi
interface Studente {
  id: number;
  nome: string;
}

export default function AggiuntaStudenti() {
  const [studenti, setStudenti] = useState<Studente[]>([]);
  const [nome, setNome] = useState<string>('');

  // Recupera lista
  useEffect(() => {
    axios.get<Studente[]>('http://localhost:8080/api/studenti')
      .then(res => setStudenti(res.data))
      .catch(err => console.error('Errore nel recupero:', err));
  }, []);

  // Aggiungi studente
  const aggiungiStudente = () => {
    if (nome.trim() === '') return;

    axios.post<Studente>('http://localhost:8080/api/studenti', { nome })
      .then(res => {
        setStudenti(prev => [...prev, res.data]);
        setNome('');
      })
      .catch(err => console.error('Errore nell\'aggiunta:', err));
  };

  // Elimina studente
  const eliminaStudente = (id: number) => {
    axios.delete(`http://localhost:8080/api/studenti/${id}`)
      .then(() => {
        setStudenti(prev => prev.filter(s => s.id !== id));
      })
      .catch(err => console.error('Errore nell\'eliminazione:', err));
  };

  return (
    <div>
      <h2>Registro Studenti</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome studente"
      />
      <button onClick={aggiungiStudente}>Aggiungi</button>

      <ul>
        {studenti.map((studente) => (
          <li key={studente.id}>
            {studente.nome}
            <button onClick={() => eliminaStudente(studente.id)}>elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
}