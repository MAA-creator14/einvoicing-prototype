'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { mockInvoices } from '@/data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [registrationState, setRegistrationStateRaw] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tide_registration_state') ?? 'NOT_REGISTERED';
    }
    return 'NOT_REGISTERED';
  });

  const setRegistrationState = useCallback((state) => {
    setRegistrationStateRaw(state);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tide_registration_state', state);
    }
  }, []);

  const [activeCustomerId, setActiveCustomerId] = useState('acme');
  const [toast, setToast] = useState(null);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  }, []);

  const addInvoice = useCallback((invoice) => {
    setInvoices(prev => [invoice, ...prev]);
  }, []);

  return (
    <AppContext.Provider value={{
      registrationState,
      setRegistrationState,
      activeCustomerId,
      setActiveCustomerId,
      toast,
      showToast,
      invoices,
      currentInvoice,
      setCurrentInvoice,
      addInvoice,
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
