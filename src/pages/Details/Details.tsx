import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { DashboardProps } from '../../components/Dashboard/DashboardProps';
import Dashboard from '../../components/Dashboard';
import ImageModal from '../../components/ImageModal';
import { Contact } from '../../utils/ContactInterfaz'

import { getContact } from '../../services/contactService';
import { updateContact } from '../../services/contactService';

const Details: React.FC<DashboardProps> = () => {
    const [contact, setContact] = useState<Contact>();
    const [isEditing, setIsEditing] = useState(false);
    const [originalContact, setOriginalContact] = useState(contact);
    
    // Obtenemos el id del contacto de los parámetros de la ruta
    const { id } = useParams<{ id: string }>();

    // Usamos el hook useEffect para obtener el contacto cuando el componente se monta o el id cambia
    useEffect(() => {
        const fetchContact = async () => {
            if (id) {
                await getContact(id).then((response) => {
                    if (response && typeof response === 'object' && response !== null) {
                        setContact(prevState => ({
                            ...prevState,
                            ...response
                        }));
                        setOriginalContact(prevState => ({
                            ...prevState,
                            ...response
                        }));
                    }
                }).catch((error: unknown) => {
                    console.error('Error:', error);
                });
            }
        };

        fetchContact();
    }, [id]);

    // Definimos la función para manejar el cambio en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact(prevState => {
            if (prevState) {
                return { ...prevState, [e.target.name]: e.target.value };
            } else {
                return {
                    id: 0,
                    name: "",
                    phone: 0,
                    address: "",
                    prefix: 0,
                    email: "",
                    image: "",
                    [e.target.name]: e.target.value,
                };
            }
        });
    };

    // Definimos la función para manejar la edición
    const handleEdit = () => {
        if (isEditing) {
            setContact(originalContact);
        } else {
            setOriginalContact(contact);
        }
        setIsEditing(!isEditing);
    };

    // Definimos la función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && id) {
            await updateContact(id, contact).then(() => {
                setIsEditing(false);
            }).catch((error: unknown) => {
                console.error('Error:', error);
            });
        }
    };

    // Definimos la función para manejar la selección de la imagen
    const handleImageSelect = (image: string) => {
        setContact(prevState => {
            if (prevState) {
                return { ...prevState, image: image };
            } else {
                return {
                    id: 0,
                    name: "",
                    phone: 0,
                    address: "",
                    prefix: 0,
                    email: "",
                    image: image,
                };
            }
        });
    };

    return (
        <Dashboard>
            <h1 className='text-3xl font-bold underline'>Detalles del Contacto</h1>
            <div className='flex-col items-center space-y-4'>
                <img
                    src={contact?.image ? require(`../../assets/svg/${contact.image}`) : ""}
                    alt='Imagen del contacto'
                    className='w-48 h-48 rounded-full object-cover mx-auto'
                />
                <ImageModal
                    isOpen={isEditing}
                    onSelect={handleImageSelect}
                />
                <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-4'>
                    <input
                        name='name'
                        value={contact?.name}
                        onChange={handleChange}
                        placeholder='Nombre'
                        className='w-1/2 p-2 border rounded mx-auto'
                        disabled={!isEditing}
                    />
                    <input
                        name='phone'
                        value={contact?.phone}
                        onChange={handleChange}
                        placeholder='Teléfono'
                        className='w-1/2 p-2 border rounded mx-auto'
                        disabled={!isEditing}
                    />
                    <input
                        name='address'
                        value={contact?.address}
                        onChange={handleChange}
                        placeholder='Dirección'
                        className='w-1/2 p-2 border rounded mx-auto'
                        disabled={!isEditing}
                    />
                    <input
                        name='prefix'
                        value={contact?.prefix}
                        onChange={handleChange}
                        placeholder='Prefijo'
                        className='w-1/2 p-2 border rounded mx-auto'
                        disabled={!isEditing}
                    />
                    <input
                        name='email'
                        value={contact?.email}
                        onChange={handleChange}
                        placeholder='Email'
                        className='w-1/2 p-2 border rounded mx-auto'
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