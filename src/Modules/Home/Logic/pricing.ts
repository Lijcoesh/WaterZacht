export const minimumPrice = 1700;

export function formatEuro(amount: number): string {
    return `€ ${Math.round(amount).toLocaleString('nl-NL')},-`;
}
