// Besparingsindicatie zoals in het design: gemiddeld € 250,- per jaar bij een gezin van 4,
// zoutverbruik ± 1 zak van 25 kg per persoon per jaar à € 15,- incl. btw.

const appliancesPerPerson = 62.5;
const contractSavings = 100;
const saltPerPerson = 15;

export const minimumPrice = 1700;

export interface Savings {
    appliances: number;
    contract: number;
    salt: number;
    net: number;
    paybackYears: number;
    tenYears: number;
}

export function calculateSavings(persons: number, noContract: boolean): Savings {
    const appliances = appliancesPerPerson * persons;
    const contract = noContract ? contractSavings : 0;
    const salt = saltPerPerson * persons;
    const net = Math.max(1, appliances + contract - salt);

    return {
        appliances,
        contract,
        salt,
        net,
        paybackYears: minimumPrice / net,
        tenYears: net * 10,
    };
}

export function formatEuro(amount: number): string {
    return `€ ${Math.round(amount).toLocaleString('nl-NL')},-`;
}
