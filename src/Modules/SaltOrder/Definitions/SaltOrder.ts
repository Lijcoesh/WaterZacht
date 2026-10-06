export type DeliveryMethod = 'delivery' | 'pickup';

export type BagSize = 15 | 25;

export interface BagLine {
    size: BagSize;
    count: number;
}

export interface SaltOrderCustomer {
    name: string;
    phone: string;
    email: string;
}

export interface SaltOrderAddress {
    street: string;
    postalCode: string;
    city: string;
}

export interface SaltOrder {
    method: DeliveryMethod;
    bags: BagLine[];
    customer: SaltOrderCustomer;
    // Alleen bij bezorgen
    address: SaltOrderAddress | null;
    note: string;
}
