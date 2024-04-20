import React, { useEffect, useState } from 'react';
import './Home.css';
import { DashboardProps } from '../../components/Dashboard/DashboardProps';
import Dashboard from '../../components/Dashboard';
import { Link } from 'react-router-dom';

import { getContacts } from '../../services/contactService';

const Home: React.FC<DashboardProps> = () => {

  const [view, setView] = useState('list');

  const [contacts, setContacts] = useState([
    {
      id: 0,
      name: "",
      phone: 0,
      address: "",
      prefix: 0,
      email: "",
      image: ""
    },
  ]);

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

  return (
    <Dashboard>
      <h1 className='text-3xl font-bold underline'>Agenda de Contactos</h1>
      <button onClick={() => setView(view === 'list' ? 'grid' : 'list')}>
        Cambiar vista
      </button>
      <div className={view === 'list' ? 'flex flex-col' : 'grid grid-cols-2 gap-4'}>
      {contacts && contacts.map((contact, index) => (
  <div key={index} className='p-4 border rounded shadow'>
    <h2 className='text-xl font-bold'>{contact.name}</h2>
    <p>{contact.phone}</p>
    <Link to={`/detalle/${contact.id}`}>Ver detalles</Link>
  </div>
))}
      </div>
    </Dashboard>
  );
}

export default Home;