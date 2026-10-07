import { postJson } from 'src/Logic/postJson';
import type { SaltOrder } from 'src/Modules/SaltOrder/Definitions/SaltOrder';

// De API stelt de mail aan Water Zacht en de bevestiging aan de klant op. Hij weigert
// witruimte aan het begin of eind van een veld, dus trimmen we hier.
export async function sendSaltOrder(order: SaltOrder): Promise<void> {
    await postJson('/api/salt-orders', {
        method: order.method,
        bags: order.bags,
        name: order.customer.name.trim(),
        phone: order.customer.phone.trim(),
        email: order.customer.email.trim(),
        address: order.address
            ? {
                  street: order.address.street.trim(),
                  postalCode: order.address.postalCode.trim(),
                  city: order.address.city.trim(),
              }
            : null,
        note: order.note.trim(),
    });
}
