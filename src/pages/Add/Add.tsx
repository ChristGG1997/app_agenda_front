import React, { useState } from 'react';
import './Add.css';
import { DashboardProps } from '../../components/Dashboard/DashboardProps';
import Dashboard from '../../components/Dashboard';
import ImageModal from '../../components/ImageModal';
import { useNavigate } from 'react-router-dom';


import { createContact } from '../../services/contactService';


const Add: React.FC<DashboardProps> = () => {
  // Usamos el hook useNavigate para la navegación
  const navigate = useNavigate();
  // Definimos el estado para el contacto
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    address: '',
    prefix: '',
    email: '',
    image: '',
  });
  // Definimos el estado para mostrar o no el modal
  const [showModal, setShowModal] = useState(false);

  // Definimos la función para manejar el cambio en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(prevState => {
      if (prevState) {
        return { ...prevState, [e.target.name]: e.target.value };
      } else {
        return {
          name: "",
          phone: "",
          address: "",
          prefix: "",
          email: "",
          image: "",
          imageUrl: "",
          [e.target.name]: e.target.value,
        };
      }
    });
  };

  // Definimos la función para manejar la selección de la imagen
  const handleImageSelect = (imageName: string) => {
    setContact(prevState => ({
      ...prevState,
      image: imageName,
    }));
    setShowModal(false);
  };

  // Definimos la función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      await createContact(contact).then(() => {
        console.log('Contacto creado');
        navigate('/');
      }).catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.error('Error: contact es undefined');
    }
  };

  return (
    <Dashboard>
      <h1 className='text-3xl font-bold underline'>Agregar Contacto</h1>

      <img
        src={contact?.image ? require(`../../assets/svg/${contact.image}`) : require(`../../assets/images/default.png`)}
        alt='Imagen del contacto'
        className='w-48 h-48 my-16 object-cover mx-auto'
        onClick={() => setShowModal(true)} // Abre el modal al hacer clic en la imagen
      />
      <ImageModal
        isOpen={showModal}
        onSelect={handleImageSelect}
      />

      <form onSubmit={handleSubmit} className='space-y-4 w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto flex flex-col items-center'>
        <input
          name='name'
          value={contact?.name}
          onChange={handleChange}
          placeholder='Nombre'
          className='w-full p-3 text-lg border rounded'
        />
        <input
          name='phone'
          value={contact?.phone}
          onChange={handleChange}
          placeholder='Teléfono'
          className='w-full p-3 text-lg border rounded'
        />
        <input
          name='address'
          value={contact?.address}
          onChange={handleChange}
          placeholder='Dirección'
          className='w-full p-3 text-lg border rounded'
        />
        <input
          name='prefix'
          value={contact?.prefix}
          onChange={handleChange}
          placeholder='Prefijo'
          className='w-full p-3 text-lg border rounded'
        />
        <input
          name='email'
          value={contact?.email}
          onChange={handleChange}
          placeholder='Email'
          className='w-full p-3 text-lg border rounded'
        />
        <button type='submit' className='w-full p-3 text-lg bg-blue-500 text-white rounded'>
          Guardar Contacto
        </button>
      </form>
    </Dashboard>
  );
}

export default Add;
