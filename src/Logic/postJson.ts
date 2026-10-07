// POST naar de eigen API (server/). In productie serveert de VPS de site en de API op
// hetzelfde domein; in development stuurt de Vite-proxy /api door naar dotnet run.
export async function postJson(path: string, body: unknown): Promise<void> {
    const response = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`POST ${path} failed with status ${response.status}`);
    }
}
