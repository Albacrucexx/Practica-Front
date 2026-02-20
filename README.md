Práctica 1 – React + TypeScript + SWAPI

En esta práctica he desarrollado una aplicación web con React y TypeScript que consume datos reales desde la API pública SWAPI.

La aplicación obtiene personajes de Star Wars, los muestra en tarjetas y permite cargar más resultados mediante paginación. También gestiona correctamente los estados de carga y error.

Tecnologías utilizadas:

- React, para construir la interfaz basada en componentes.

- TypeScript, para tipar los datos y trabajar de forma más segura.

- Vite, como entorno de desarrollo.

- Axios, para realizar las peticiones HTTP.

- CSS, para el diseño visual.

Configuración de la API: He creado una instancia de Axios en api/api.ts utilizando una variable de entorno como baseURL:

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


La URL se define en el archivo .env:

VITE_API_URL=https://swapi.dev/api


De esta forma, la URL de la API no está escrita directamente en el código, lo que facilita su modificación en el futuro.

Gestión de estado en App.tsx: En el componente principal he definido varios estados con useState:

const [characters, setCharacters] = useState<CharacterT[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const [nextPage, setNextPage] = useState<string | null>(null);


- characters almacena los personajes recibidos.

- loading controla cuándo mostrar el mensaje de carga.

- error guarda posibles errores de la petición.

- nextPage almacena la URL de la siguiente página para la paginación.

Llamada inicial a la API: Uso useEffect para realizar la primera petición cuando el componente se monta:

useEffect(() => {
  fetchCharacters("/people/");
}, []);


El array vacío indica que solo se ejecuta una vez, al iniciar la aplicación.

Función fetchCharacters: La función encargada de hacer la petición es la siguiente:

const fetchCharacters = async (url: string) => {
  try {
    setLoading(true);
    setError(null);

    const response = await api.get(url);

    setCharacters(prev => [...prev, ...response.data.results]);
    setNextPage(response.data.next);

  } catch (err) {
    setError("Error al cargar personajes");
  } finally {
    setLoading(false);
  }
};


En esta función:

- Activo el estado de carga.

- Limpio posibles errores anteriores.

- Realizo la petición con Axios.

- Añado los nuevos personajes al estado anterior usando el operador spread.

- Guardo la siguiente página que devuelve la API.

- Si ocurre un error, lo guardo en el estado error.

- Finalmente, desactivo el loading.

Renderizado de personajes: Los personajes se muestran utilizando el componente Character:

<div className="charactersContainer">
  {characters.map((c, index) => (
    <Character key={index} character={c} />
  ))}
</div>


Uso map para recorrer el array y renderizar una tarjeta por cada personaje. El componente recibe el objeto tipado como CharacterT.

También controlo los estados:

{loading && <p>Cargando...</p>}
{error && <p>{error}</p>}

Paginación: Si la API devuelve una URL en nextPage, muestro un botón:

{nextPage && !loading && (
  <button onClick={() => fetchCharacters(nextPage)}>
    Siguiente Página
  </button>
)}

Al pulsarlo, se realiza otra petición sin recargar la página y se añaden los nuevos personajes al listado.

Tipado con TypeScript: En el directorio types he definido el tipo:

export type CharacterT = {
  name: string;
  gender: string;
  birth_year: string;
};


Esto garantiza que los componentes trabajen con datos estructurados correctamente y evita errores al acceder a propiedades.

Conclusión:

- La aplicación cumple los requisitos de la práctica:

- Consumo de una API real.

- Uso de TypeScript.

- Separación en componentes.

Gestión de estados de carga y error.

- Implementación de paginación.

- Diseño estructurado sin librerías externas.



