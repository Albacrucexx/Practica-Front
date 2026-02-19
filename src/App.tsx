import { useEffect, useState } from 'react';
import { api } from './api/api';
import './App.css';
import { Character } from './components';
import type { CharacterT } from './types';

const App = () => {
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacters('https://swapi.dev/api/people/');
  }, []);

  const fetchCharacters = (url: string) => {
    setLoading(true);
    setError(null);

    api.get(url)
      .then((res) => {
        console.log(res)
        setCharacters(prev => [...prev, ...res.data.results]);
        setNextPage(res.data.next);
      })
      .catch((e) => {
        setError(`Error cargando datos: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mainContainer">
      <h1>Star Wars Characters</h1>

      {loading && <h2>Cargando...</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}

      <div className="charactersContainer">
        {characters.map((c, index) => (
          <Character key={index} character={c} />
        ))}
      </div>

      {nextPage && !loading && (
        <button onClick={() => fetchCharacters(nextPage)}>
          Siguiente Página
        </button>
      )}
    </div>
  );
};

export default App;
