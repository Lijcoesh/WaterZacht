import { pickupLeadWorkdays } from 'src/Config/saltOrder';

// Verwachte ophaaldatum: het opgegeven aantal werkdagen na vandaag, weekenden overgeslagen.
// Geeft null zolang er geen levertijd is ingesteld.
export function expectedPickupDate(from: Date = new Date()): Date | null {
    if (pickupLeadWorkdays === null) return null;

    const date = new Date(from);
    let remaining = pickupLeadWorkdays;

    while (remaining > 0) {
        date.setDate(date.getDate() + 1);
        const day = date.getDay();
        if (day !== 0 && day !== 6) remaining--;
    }

    return date;
}

export function formatPickupDate(date: Date): string {
    return date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' });
}
