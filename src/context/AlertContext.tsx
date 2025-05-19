import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlertContextType {
  alert: { message: string; type: 'error' | 'success' } | null;
  showAlert: (message: string, type: 'error' | 'success') => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const showAlert = (message: string, type: 'error' | 'success' = 'error') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
}; 