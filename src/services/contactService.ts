// Importamos la configuración de la API
import api from './api';

// Función para obtener todos los contactos
export const getContacts = async () => {
  // Realizamos una petición GET a la ruta '/Agenda'
  const response = await api.get('/Agenda');
  return response.data;
};

// Función para obtener un contacto específico por su ID
export const getContact = async (id: string) => {
  // Realizamos una petición GET a la ruta '/Agenda/{id}'
  const response = await api.get(`/Agenda/${id}`);
  return response.data;
};

// Función para crear un nuevo contacto
export const createContact = async (contact: any) => {
  // Realizamos una petición POST a la ruta '/Agenda', enviando los datos del contacto
  const response = await api.post('/Agenda', contact);
  return response.data;
};

// Función para actualizar un contacto existente
export const updateContact = async (id: string, contact: any) => {
  // Realizamos una petición PUT a la ruta '/Agenda/{id}', enviando los nuevos datos del contacto
  const response = await api.put(`/Agenda/${id}`, contact);
  return response.data;
};

// Función para eliminar un contacto
export const deleteContact = async (id: string) => {
  // Realizamos una petición DELETE a la ruta '/Agenda/{id}'
  const response = await api.delete(`/Agenda/${id}`);
  return response.data;
};
