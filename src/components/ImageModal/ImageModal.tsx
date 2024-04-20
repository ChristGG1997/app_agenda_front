import React from 'react';
import './ImageModal.css';
import { ImageModalProps } from './ImageModalProps';


const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onSelect }) => {
    if (!isOpen) {
        return null;
    }

    let data = [
        { id: 1, name: 'icons8-amethyst-universe.svg' },
        { id: 1, name: 'icons8-badtz-maru.svg' },
        { id: 1, name: 'icons8-brave.svg' },
        { id: 1, name: 'icons8-grim-adventures-of-billy-and-mandy.svg' },
        { id: 1, name: 'icons8-grinch.svg' },
        { id: 1, name: 'icons8-hello-kitty.svg' },
        { id: 1, name: 'icons8-jerry.svg' },
        { id: 1, name: 'icons8-jimmy-neutron.svg' },
        { id: 1, name: 'icons8-monkey-d-luffy.svg' },
        { id: 1, name: 'icons8-morty-smith.svg' },
        { id: 1, name: 'icons8-my-melody.svg' },
        { id: 1, name: 'icons8-rick-sanchez.svg' },
        { id: 1, name: 'icons8-sailor-moon.svg' },
        { id: 1, name: 'icons8-saitama.svg' },
        { id: 1, name: 'icons8-spongebob-squarepants.svg' },
        { id: 1, name: 'icons8-the-coon.svg' },
        { id: 1, name: 'icons8-woody-woodpecker.svg' }
    ]

    return (
        <div className='modal flex overflow-x-auto p-4 bg-white rounded-lg shadow-lg'>
            {data.map((image) => (
                <img
                    key={image.name}
                    src={require(`../../assets/svg/${image.name}`)}
                    alt={image.name}
                    onClick={() => onSelect(image.name)}
                    className='w-24 h-24 object-cover rounded-lg mr-4 cursor-pointer'
                />
            ))}
        </div>
    );
}

export default ImageModal;