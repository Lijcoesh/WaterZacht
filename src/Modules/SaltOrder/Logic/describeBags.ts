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
