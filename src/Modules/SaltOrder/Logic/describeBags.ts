import { bagSizes, deliveryMinimums } from 'src/Config/saltOrder';
import type { BagLine } from 'src/Modules/SaltOrder/Definitions/SaltOrder';

export function describeBagLine(line: BagLine): string {
    return `${line.count} ${line.count === 1 ? 'zak' : 'zakken'} van ${line.size} kg`;
}

export function describeBags(bags: BagLine[]): string {
    return bags
        .filter(line => line.count > 0)
        .map(describeBagLine)
        .join(' en ');
}

// "6 zakken van 15 kg of 4 zakken van 25 kg"
export function describeDeliveryMinimum(): string {
    return bagSizes
        .map(size => describeBagLine({ size, count: deliveryMinimums[size] }))
        .join(' of ');
}

export function meetsDeliveryMinimum(bags: BagLine[]): boolean {
    return bags.length > 0 && bags.every(line => line.count >= deliveryMinimums[line.size]);
}
