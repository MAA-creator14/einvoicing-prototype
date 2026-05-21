'use client';

import { useAppState } from '@/lib/AppContext';

export function useInvoiceState() {
  const { invoices, currentInvoice, setCurrentInvoice, addInvoice } = useAppState();
  return { invoices, currentInvoice, setCurrentInvoice, addInvoice };
}
