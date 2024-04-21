// Importamos la librería axios para realizar peticiones HTTP
import axios from 'axios';

// Creamos una instancia de axios con una configuración específica
const api = axios.create({
  baseURL: 'https://localhost:7001/api', 
});

// Exportamos la instancia de axios para ser utilizada en otras partes de nuestra aplicación
export default api;
