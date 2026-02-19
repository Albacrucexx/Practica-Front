# Práctica 1 – React + TypeScript + SWAPI

## 1. Descripción del proyecto

El objetivo de esta práctica es desarrollar una aplicación web utilizando React y TypeScript que consuma datos reales desde la API pública SWAPI (Star Wars API).

La aplicación permite:

- Obtener personajes desde la API.
- Mostrar los personajes en tarjetas.
- Gestionar estados de carga y error.
- Implementar paginación mediante un botón.
- Aplicar una estética cuidada y estructurada.

---

## 2. Tecnologías utilizadas

- React
- TypeScript
- Vite
- Axios
- CSS

---

## 3. Estructura del proyecto

src
│
├── api
│ └── api.ts
│
├── components
│ ├── index.tsx
│ └── style.css
│
├── types
│ ├── character.ts
│ └── index.ts
│
├── App.tsx
├── App.css
├── main.tsx
├── index.css
│
.env

yaml
Copiar código

---

## 4. Instalación y ejecución

### 4.1 Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd nombre-del-proyecto
4.2 Instalar dependencias
bash
Copiar código
npm install
4.3 Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

ini
Copiar código
VITE_API_URL=https://swapi.dev/api
Este archivo no se incluye en el repositorio por motivos de configuración y buenas prácticas.

4.4 Ejecutar el proyecto
bash
Copiar código
npm run dev
El proyecto se ejecutará en:

arduino
Copiar código
http://localhost:5173
5. Funcionamiento de la aplicación
5.1 Configuración de Axios
En el archivo api/api.ts se crea una instancia de axios utilizando una variable de entorno como baseURL:

ts
Copiar código
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
Esto permite separar la URL de la API del código principal y facilita futuras modificaciones.

5.2 Gestión de estados en App.tsx
En el componente principal se definen los siguientes estados:

characters: almacena los personajes obtenidos.

loading: indica si la aplicación está cargando datos.

error: almacena posibles errores de la petición.

nextPage: guarda la URL de la siguiente página para la paginación.

5.3 Llamada inicial a la API
Se utiliza el hook useEffect para realizar la primera petición al cargar la aplicación:

ts
Copiar código
useEffect(() => {
  fetchCharacters('/people/');
}, []);
La función fetchCharacters:

Activa el estado de carga.

Realiza la petición a la API.

Acumula los personajes recibidos.

Guarda la siguiente página.

Gestiona posibles errores.

Finaliza el estado de carga.

5.4 Renderizado de componentes
Los personajes se renderizan utilizando el componente Character:

tsx
Copiar código
{characters.map((c, index) => (
  <Character key={index} character={c} />
))}
El componente recibe un objeto tipado CharacterT, garantizando seguridad en el tipado mediante TypeScript.

5.5 Paginación
Si la API devuelve una URL en nextPage, se muestra el botón:

tsx
Copiar código
{nextPage && !loading && (
  <button onClick={() => fetchCharacters(nextPage)}>
    Siguiente Página
  </button>
)}
Esto permite cargar nuevos personajes sin recargar la página.

6. Tipado con TypeScript
En el directorio types se define el tipo CharacterT:

ts
Copiar código
export type CharacterT = {
  name: string;
  gender: GenderT;
  birth_year: string;
};
Esto garantiza que los datos utilizados en los componentes tengan la estructura esperada.

7. Estética aplicada
Se ha aplicado una estética cuidada basada en:

Tarjetas diferenciadas mediante fondo y borde.

Diseño en grid para distribución uniforme.

Buen contraste entre texto y fondo.

Jerarquía visual clara en el nombre del personaje.

Espaciado coherente y ordenado.

No se han utilizado librerías externas de estilos.

8. Requisitos cumplidos
Uso de TypeScript.

Consumo de API real.

Separación en componentes.

Gestión de estados de carga y error.

Implementación de paginación.

Estructura modular.

Diseño cuidado.

9. Conclusión
La aplicación cumple los requisitos técnicos establecidos en la práctica, demostrando el uso correcto de React para el consumo de APIs, la gestión de estados y la organización modular del código.git 