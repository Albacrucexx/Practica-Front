import './style.css';
import type { CharacterT } from '../types';

export const Character = ({ character }: { character: CharacterT }) => {
  return (
    <div className="characterContainer">
      <h3>{character.name}</h3>
      <p><strong>Género:</strong> {character.gender}</p>
      <p><strong>Año nacimiento:</strong> {character.birth_year}</p>
    </div>
  );
};
