// Regels voor het zoutbestelformulier, zoals de PO ze heeft aangegeven (oktober 2026).

import type { BagSize } from 'src/Modules/SaltOrder/Definitions/SaltOrder';

// Adres waar bestellingen naartoe gaan. Voorbeeld van de PO, nog laten bevestigen.
export const saltOrderEmail = 'zout@waterzacht.nl';

export const bagSizes: BagSize[] = [15, 25];

// Bij bezorgen kiest de klant uit deze vaste pakketten.
export const deliveryPackages: { id: string; size: BagSize; count: number }[] = [
    { id: '6x15', size: 15, count: 6 },
    { id: '4x25', size: 25, count: 4 },
];

// Bij afhalen bepaalt de klant zelf het aantal; dit is alleen een bovengrens tegen tikfouten.
export const maxPickupBagsPerSize = 99;

// Aantal werkdagen tot het zout klaarstaat om op te halen. null zolang de PO dit niet
// heeft opgegeven: het formulier toont dan geen datum, alleen dat we contact opnemen.
export const pickupLeadWorkdays: number | null = null;
