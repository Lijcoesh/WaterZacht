export interface QuoteRequest {
    name: string;
    phone: string;
    email: string;
    message: string;
}

// Er is nog geen backend of formulierdienst gekozen. Tot die er is faalt verzenden
// expres, zodat bezoekers nooit een bevestiging zien voor een bericht dat niet aankomt.
// Zie "Openstaand" in .claude/conventions/launch-checklist.md.
export async function sendQuoteRequest(request: QuoteRequest): Promise<void> {
    void request;

    throw new Error('Quote requests are not configured yet');
}
