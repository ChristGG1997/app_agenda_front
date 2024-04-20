import React, { useState } from 'react';
import './Add.css';
import { DashboardProps } from '../../components/Dashboard/DashboardProps';
import Dashboard from '../../components/Dashboard';

import { createContact } from '../../services/contactService'; 


const Add: React.FC<DashboardProps>  = () => {
    const [contact, setContact] = useState({
        Name: '',
        Phone: '',
        Address: '',
        Prefix: '',
        Email: '',
        Image: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createContact(contact).then(() => {
          console.log('Contacto creado');
          
        }).catch((error) => {
          console.error('Error:', error);
        })
      };
    
      return (
        <Dashboard>
          <h1 className='text-3xl font-bold underline'>Agregar Contacto</h1>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              name='Name'
              value={contact.Name}
              onChange={handleChange}
              placeholder='Nombre'
              className='w-full p-2 border rounded'
            />
            <input
              name='Phone'
              value={contact.Phone}
              onChange={handleChange}
              placeholder='Teléfono'
              className='w-full p-2 border rounded'
            />
            <input
              name='Address'
              value={contact.Address}
              onChange={handleChange}
              placeholder='Dirección'
              className='w-full p-2 border rounded'
            />
            <input
              name='Prefix'
              value={contact.Prefix}
              onChange={handleChange}
              placeholder='Prefijo'
              className='w-full p-2 border rounded'
            />
            <input
              name='Email'
              value={contact.Email}
              onChange={handleChange}
              placeholder='Email'
              className='w-full p-2 border rounded'
            />
            <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded'>
              Guardar Contacto
            </button>
          </form>
        </Dashboard>
      );
}

export default Add;