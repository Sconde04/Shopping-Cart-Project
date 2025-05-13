import React from 'react';
import { useAlert } from '../context/AlertContext';

export const Alert: React.FC = () => {
  const { alert } = useAlert();

  if (!alert) return null;

  return (
    <div 
      className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
        alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white z-50`}
    >
      {alert.message}
    </div>
  );
}; 