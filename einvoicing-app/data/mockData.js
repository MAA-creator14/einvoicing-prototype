export { countryNetworkMap } from './networkConfig';

export const REGISTRATION_STATES = {
  NOT_REGISTERED: 'NOT_REGISTERED',
  PENDING:        'PENDING',
  REGISTERED:     'REGISTERED',
};

export const customers = [
  {
    id: 'acme',
    name: 'Acme Ltd',
    initials: 'AL',
    email: 'finance@acmeltd.co.uk',
    countryCode: 'GB',
    networkConfig: {
      networkType: 'PEPPOL',
      participantId: '0060:123456789',
      schemeId: '0060',
      countryCode: 'GB',
    },
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen Consulting',
    initials: 'SC',
    email: 'sarah@chenconsulting.co.uk',
    countryCode: 'GB',
    networkConfig: {
      networkType: null,
      participantId: null,
      schemeId: null,
      countryCode: 'GB',
    },
  },
  {
    id: 'muller',
    name: 'Müller GmbH',
    initials: 'MG',
    email: 'rechnungen@muellergmbh.de',
    countryCode: 'DE',
    networkConfig: {
      networkType: 'XRECHNUNG',
      participantId: null,
      schemeId: null,
      countryCode: 'DE',
    },
  },
];

export const defaultLineItems = [
  { id: 1, description: 'Strategy consultation — 3 days @ £400', qty: 3, unitPrice: 400, vatEnabled: true },
  { id: 2, description: 'Travel expenses', qty: 1, unitPrice: 250, vatEnabled: false },
];

export const mockInvoices = [
  {
    id: 'INV-2026-039',
    customerId: 'sarah-chen',
    customerName: 'Sarah Chen Consulting',
    amount: 1200.00,
    date: '2026-05-06',
    status: 'SENT',
    isEinvoice: false,
    statusTrail: null,
  },
  {
    id: 'INV-2026-040',
    customerId: 'acme',
    customerName: 'Acme Ltd',
    amount: 3450.00,
    date: '2026-05-17',
    status: 'EINVOICE_DELIVERED',
    isEinvoice: true,
    networkConfig: {
      networkType: 'PEPPOL',
      participantId: '0060:123456789',
      schemeId: '0060',
      countryCode: 'GB',
    },
    statusTrail: [
      { state: 'complete', title: 'Sent', meta: '17 May, 14:22' },
      { state: 'complete', title: "Delivered to Acme Ltd's accounting system", meta: '17 May, 14:22' },
      { state: 'pending',  title: 'Acknowledged by Acme Ltd', meta: 'Optional — not needed for payment', tag: 'Optional' },
    ],
  },
];
