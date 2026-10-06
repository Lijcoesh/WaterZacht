import { saltOrderEmail } from 'src/Config/saltOrder';
import type { SaltOrder } from 'src/Modules/SaltOrder/Definitions/SaltOrder';

import { describeBags } from './describeBags';

export interface SaltOrderMail {
    to: string;
    replyTo: string;
    subject: string;
    body: string;
}

// De mail aan Martin met de bestelling. Betalen gaat achteraf op rekening, dus er
// zit geen betaalstap in; deze mail is de hele bestelling.
export function formatSaltOrderMail(order: SaltOrder): SaltOrderMail {
    const methodLabel = order.method === 'delivery' ? 'Bezorgen' : 'Zelf afhalen';
    const lines = [
        `Wijze: ${methodLabel}`,
        `Zout: ${describeBags(order.bags)}`,
        '',
        `Naam: ${order.customer.name}`,
        `Telefoon: ${order.customer.phone}`,
        `E-mail: ${order.customer.email}`,
    ];

    if (order.address) {
        lines.push(
            '',
            'Bezorgadres:',
            order.address.street,
            `${order.address.postalCode} ${order.address.city}`,
        );
    }

    if (order.note.trim()) {
        lines.push('', `Opmerking: ${order.note.trim()}`);
    }

    lines.push('', 'Betaling: achteraf op rekening.');

    return {
        to: saltOrderEmail,
        replyTo: order.customer.email,
        subject: `Zoutbestelling (${methodLabel.toLowerCase()}): ${order.customer.name}`,
        body: lines.join('\n'),
    };
}

// Er is nog geen backend of formulierdienst gekozen. Tot die er is faalt verzenden
// expres, zodat bezoekers nooit een bevestiging zien voor een bestelling die niet aankomt.
// Zie "Openstaand" in .claude/conventions/launch-checklist.md.
export async function sendSaltOrder(order: SaltOrder): Promise<void> {
    void formatSaltOrderMail(order);

    throw new Error('Salt orders are not configured yet');
}
