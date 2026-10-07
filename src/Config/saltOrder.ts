// Regels voor het zoutbestelformulier, zoals de PO ze heeft aangegeven (oktober 2026).
// De API controleert dezelfde regels in server/Constants/SaltOrderConstants.cs: wijzig ze samen.

import type { BagSize } from 'src/Modules/SaltOrder/Definitions/SaltOrder';

export const bagSizes: BagSize[] = [15, 25];

// Bij bezorgen staat elke maat op 0 of op minstens dit aantal. Kiest de klant voor bezorgen,
// dan staan de tellers standaard op deze aantallen.
export const deliveryMinimums: Record<BagSize, number> = { 15: 6, 25: 4 };

// Alleen een bovengrens tegen tikfouten.
export const maxBagsPerSize = 99;

// Aantal werkdagen tot het zout klaarstaat om op te halen. null zolang de PO dit niet
// heeft opgegeven: het formulier toont dan geen datum, alleen dat we contact opnemen.
export const pickupLeadWorkdays: number | null = null;
