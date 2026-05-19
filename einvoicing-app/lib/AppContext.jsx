'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [registrationState, setRegistrationState] = useState('NOT_REGISTERED');
  const [activeCustomerId, setActiveCustomerId] = useState('acme');
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  }, []);

  return (
    <AppContext.Provider value={{
      registrationState,
      setRegistrationState,
      activeCustomerId,
      setActiveCustomerId,
      toast,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
