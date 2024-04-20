import api from './api';

export const getContacts = async () => {
  const response = await api.get('/Agenda');
  return response.data;
};

export const getContact = async (id: string) => {
  const response = await api.get(`/Agenda/${id}`);
  return response.data;
};

export const createContact = async (contact: any) => {
  const response = await api.post('/Agenda', contact);
  return response.data;
};

export const updateContact = async (id: string, contact: any) => {
  const response = await api.put(`/Agenda/${id}`, contact);
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await api.delete(`/Agenda/${id}`);
  return response.data;
};