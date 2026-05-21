export const NETWORK_TYPES = {
  PEPPOL:     'PEPPOL',
  XRECHNUNG:  'XRECHNUNG',
  CHORUS_PRO: 'CHORUS_PRO',
  SDI:        'SDI',
  IRP:        'IRP',
};

export const countryNetworkMap = {
  GB: {
    networkType: NETWORK_TYPES.PEPPOL,
    supported: true,
    label: 'UK Peppol Network',
  },
  DE: {
    networkType: NETWORK_TYPES.XRECHNUNG,
    supported: false,
    comingSoon: true,
    label: 'German e-invoicing network (xRechnung)',
  },
  FR: {
    networkType: NETWORK_TYPES.CHORUS_PRO,
    supported: false,
    comingSoon: true,
    label: 'French e-invoicing network (Chorus Pro)',
  },
  IT: {
    networkType: NETWORK_TYPES.SDI,
    supported: false,
    comingSoon: true,
    label: 'Italian e-invoicing network (SdI)',
  },
  IN: {
    networkType: NETWORK_TYPES.IRP,
    supported: false,
    comingSoon: false,
    label: 'Indian e-invoicing network (IRP)',
  },
};
