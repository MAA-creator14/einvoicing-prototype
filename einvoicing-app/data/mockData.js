export const countryNetworkMap = {
  GB: { networkType: 'PEPPOL', supported: true },
  DE: { networkType: 'XRECHNUNG', supported: false, comingSoon: true },
  FR: { networkType: 'CHORUS_PRO', supported: false, comingSoon: true },
  IT: { networkType: 'SDI', supported: false, comingSoon: true },
  IN: { networkType: 'IRP', supported: false, comingSoon: false },
};

export const customers = [
  {
    id: 'acme',
    name: 'Acme Studios Ltd',
    initials: 'AS',
    email: 'finance@acmestudios.co.uk',
    countryCode: 'GB',
    networkConfig: {
      networkType: 'PEPPOL',
      participantId: '0060:9912345678',
      schemeId: 'GB-VAT',
      countryCode: 'GB',
    },
  },
  {
    id: 'joe-bloggs',
    name: 'Joe Bloggs Trading',
    initials: 'JB',
    email: 'joe@joebloggsco.co.uk',
    countryCode: 'GB',
    networkConfig: {
      networkType: 'PEPPOL',
      participantId: null,
      schemeId: null,
      countryCode: 'GB',
    },
  },
  {
    id: 'deutsche-tech',
    name: 'Deutsche Tech GmbH',
    initials: 'DT',
    email: 'rechnungen@deutschetech.de',
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
  { id: 1, description: 'Brand identity design', qty: 1, unitPrice: 1200, vatEnabled: true },
  { id: 2, description: 'Web design', qty: 8, unitPrice: 95, vatEnabled: true },
];

export const mockInvoices = [
  {
    id: 'INV-2026-039',
    customerId: 'joe-bloggs',
    customerName: 'Joe Bloggs Trading',
    amount: 850.0,
    date: '2026-05-12',
    status: 'paid',
    isEinvoice: false,
    statusTrail: null,
  },
  {
    id: 'INV-2026-040',
    customerId: 'acme',
    customerName: 'Acme Studios Ltd',
    amount: 1960.0,
    date: '2026-05-16',
    status: 'sent',
    isEinvoice: true,
    statusTrail: [
      { state: 'complete', title: 'Sent', meta: '16 May, 09:41' },
      { state: 'complete', title: "Delivered to Acme Studios' accounting system", meta: '16 May, 09:41' },
      { state: 'pending', title: 'Acknowledged by Acme Studios', meta: 'Optional — not needed for payment', tag: 'Optional' },
    ],
  },
];
