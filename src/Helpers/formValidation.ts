// Controles voor de formulieren, zodat de bezoeker een fout bij het veld zelf ziet. De API
// controleert hetzelfde (server/Commands/); deze regels zijn even streng of strenger.

export const maxLengths = {
    name: 100,
    phone: 20,
    email: 254,
    message: 2000,
    street: 100,
    postalCode: 7,
    city: 100,
    note: 1000,
};

export type FieldErrors<T> = Partial<Record<keyof T, string | null>>;

export function hasErrors<T>(errors: FieldErrors<T>): boolean {
    return Object.values(errors).some(Boolean);
}

export function validateRequired(value: string, message: string): string | null {
    return value.trim() ? null : message;
}

export function validatePhone(value: string): string | null {
    const phone = value.trim();
    if (!phone) return 'Vul uw telefoonnummer in.';

    const digits = phone.replace(/\D/g, '').length;
    if (!/^\+?[\d\s\-()]+$/.test(phone) || digits < 6 || phone.length > maxLengths.phone) {
        return 'Vul een geldig telefoonnummer in.';
    }

    return null;
}

export function validateEmail(value: string): string | null {
    const email = value.trim();
    if (!email) return 'Vul uw e-mailadres in.';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Vul een geldig e-mailadres in.';
    }

    return null;
}

export function validatePostalCode(value: string): string | null {
    const postalCode = value.trim();
    if (!postalCode) return 'Vul uw postcode in.';

    if (!/^[1-9]\d{3} ?[a-zA-Z]{2}$/.test(postalCode)) {
        return 'Vul een geldige postcode in.';
    }

    return null;
}
