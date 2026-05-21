'use client';

import { useAppState } from '@/lib/AppContext';

export function useRegistrationState() {
  const { registrationState, setRegistrationState } = useAppState();
  return { registrationState, setRegistrationState };
}
