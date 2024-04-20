import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { DashboardProps } from '../../components/Dashboard/DashboardProps';
import Dashboard from '../../components/Dashboard';
import ImageModal from '../../components/ImageModal';

import { getContact } from '../../services/contactService';





const Details: React.FC<DashboardProps> = () => {
    const [contact, setContact] = useState({
        id: 0,
        name: "",
        phone: 0,
        address: "",
        prefix: 0,
        email: "",
        image: 'icons8-monkey-d-luffy.svg',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchContact = async () => {
            if (id) {
                await getContact(id).then((response) => {
                    if (response && typeof response === 'object' && response !== null) {
                        setContact(response);                 
                    }
                }).catch((error: unknown) => {
                    console.error('Error:', error);
                });
            }
        };

        fetchContact();
    }, [id]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
    };

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleImageSelect = (image: string) => {
        setContact({ ...contact, image: image });
        setIsModalOpen(false);
    };

    return (
        <Dashboard>
            <h1 className='text-3xl font-bold underline'>Detalles del Contacto</h1>
            <div className='flex items-center space-x-4'>
                <img
                    src={require(`../../assets/svg/${contact.image}`)}
                    alt='Imagen del contacto'
                    className='w-24 h-24 rounded-full object-cover'
                    onClick={handleImageClick}
                />
                <ImageModal
                    isOpen={isModalOpen}
                    onSelect={handleImageSelect}
                />
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        name='nombre'
                        value={contact.name}
                        onChange={handleChange}
                        placeholder='Nombre'
                        className='w-full p-2 border rounded'
                        disabled={!isEditing}
                    />
                    <input
                        name='telefono'
                        value={contact.phone}
                        onChange={handleChange}
                        placeholder='Teléfono'
                        className='w-full p-2 border rounded'
                        disabled={!isEditing}
                    />
                    <input
                        name='direccion'
                        value={contact.address}
                        onChange={handleChange}
                        placeholder='Dirección'
                        className='w-full p-2 border rounded'
                        disabled={!isEditing}
                    />
                    <input
                        name='prefijo'
                        value={contact.prefix}
                        onChange={handleChange}
                        placeholder='Prefijo'
                        className='w-full p-2 border rounded'
                        disabled={!isEditing}
                    />
                    <input
                        name='email'
                        value={contact.email}
                        onChange={handleChange}
                        placeholder='Email'
                        className='w-full p-2 border rounded'
                        disabled={!isEditing}
                    />
                    <div className='flex space-x-2'>
                        <button type='button' onClick={handleEdit} className='w-full p-2 bg-blue-500 text-white rounded'>
                            {isEditing ? 'Cancelar' : 'Editar'}
                        </button>
                        {isEditing && (
                            <button type='submit' className='w-full p-2 bg-green-500 text-white rounded'>
                                Guardar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}

export default Details;