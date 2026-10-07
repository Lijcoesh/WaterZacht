import { postJson } from 'src/Logic/postJson';

export interface QuoteRequest {
    name: string;
    phone: string;
    email: string;
    message: string;
}

// De API weigert witruimte aan het begin of eind van een veld, dus trimmen we hier.
export async function sendQuoteRequest(request: QuoteRequest): Promise<void> {
    await postJson('/api/quote-requests', {
        name: request.name.trim(),
        phone: request.phone.trim(),
        email: request.email.trim(),
        message: request.message.trim(),
    });
}
