import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { DashboardProps } from './DashboardProps';


const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-200">
            <div className="p-6 w-64 bg-white shadow-md">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <nav>
                    <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
                        Inicio
                    </Link>                    
                    <Link to="/agregar" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
                        Agregar
                    </Link>
                </nav>
            </div>
            <div className="flex-grow p-6">
                {children}
            </div>
        </div>
    );
}

export default Dashboard;