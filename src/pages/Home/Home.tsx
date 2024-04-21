import React, { useEffect, useState } from 'react';
import './Home.css';
import { DashboardProps } from '../../components/Dashboard/DashboardProps';
import Dashboard from '../../components/Dashboard';
import { Link } from 'react-router-dom';
import { Contact } from '../../utils/ContactInterfaz'

import { getContacts } from '../../services/contactService';
import { deleteContact } from '../../services/contactService';


const Home: React.FC<DashboardProps> = () => {

  const [view, setView] = useState('list');

  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      await getContacts().then((response) => {
        setContacts(response);
      }).catch((error: unknown) => {
        console.error('Error:', error);
      });
    };

    fetchContacts();
  }, []);

  const handleDelete = (id: number) => {
    deleteContact(id.toString())
      .then(() => {
        console.log('Contacto eliminado con éxito');
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch((error) => {
        console.error('Hubo un error al eliminar el contacto:', error);
      });
  };

  return (
    <Dashboard>
      <h1 className='text-3xl font-bold underline'>Agenda de Contactos</h1>
      <button onClick={() => setView('list')} className='bg-gray-200 rounded-full px-4 py-2 m-2'>
        <img src={require('../../assets/images/list.png')} alt='Icono de lista' className='w-6 h-6' />
      </button>
      <button onClick={() => setView('grid')} className='bg-gray-200 rounded-full px-4 py-2 m-2'>
        <img src={require('../../assets/images/grid.png')} alt='Icono de lista' className='w-6 h-6' />
      </button>
      <div className={view === 'list' ? 'flex flex-col' : 'grid grid-cols-2 gap-4 justify-center items-center'}>
        {contacts && contacts.map((contact, index) => (
          <div key={index} className={view === 'list' ? 'flex space-x-4 p-4 border rounded shadow' : 'flex flex-col items-center p-4 border rounded shadow'}>
            <img
              src={contact.image ? require(`../../assets/svg/${contact.image}`) : ""}
              alt='Imagen del contacto'
              className='w-24 h-24 rounded-full object-cover'
            />
            <div className={view === 'list' ? '' : 'text-center'}>
              <h2 className='text-xl font-bold'>{contact.name}</h2>
              <p>{contact.phone}</p>
              <Link to={`/detalle/${contact.id}`} className='inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                Ver detalles
              </Link>
              <button onClick={() => handleDelete(contact.id)} className='inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}

export default Home;