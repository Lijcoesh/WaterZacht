# Backend-conventies (`server/`)

ASP.NET Core (.NET 10) met Controllers. De API ontvangt de formulieren van de site en verstuurt mail via Brevo; er is geen database en geen auth. Gebaseerd op de conventies van UpNext.API, zonder de delen voor database, auth en NSwag.

| Commando (in `server/`) | Doel |
|---|---|
| `dotnet run --launch-profile http` | API op poort 5080; `npm run dev` proxyt `/api` daarheen |
| `dotnet build -warnaserror` | Bouwen zoals CI (`.github/workflows/server.yml`) |
| `dotnet test` | Tests |
| `dotnet user-secrets set "Brevo:ApiKey" "<key>"` | Lokaal ook `Brevo:SenderEmail`; zonder start de API niet |

Op de VPS komen secrets uit environment variables (`Brevo__ApiKey`), nooit uit een gecommit config-bestand.

## Structuur

Layer-first: één map per technische rol, de feature is de bestandsnaam-prefix. Een map wordt pas aangemaakt als er iets in hoort.

`Controllers/`, `Commands/` (request-modellen), `Models/` (DTO's van externe API's, met de API als prefix: `BrevoEmail`), `Services/`, `Validators/`, `Interfaces/` (alle interfaces, niet naast de implementatie), `Configuration/` (Options), `Constants/` (`<Feature>Constants`), `Enums/`, `Exceptions/`, `Middleware/`, `Extensions/`, `Validation/` (eigen `ValidationAttribute`s). Tests in `server/WaterZacht.API.Tests/`.

## Lagen

- **Controllers**: route, rate-limit policy, request doorgeven. Geen logica.
- **Services**: roepen eerst hun Validator aan, dan een eventuele limiter, dan de mail.
- **Validators**: business rules (minimum aantal zakken bij bezorgen, adres alleen bij bezorgen), één `Validate<Actie>` per Service-methode. Zonder I/O zijn ze synchroon. Ze gooien een `DomainException`. Formaatchecks horen op het Command.
- Elke Service, Validator en limiter heeft een interface en wordt in `Program.cs` geregistreerd: `AddTransient`, een limiter `AddSingleton` (hij houdt de buckets bij).
- Een externe HTTP-API is een typed client met base-URL en timeouts uit zijn Options-class (`BrevoEmailService`). Retry alleen op 429, niet op 5xx of na een timeout: de mail kan dan al verstuurd zijn.

## Endpoints en Commands

- `POST api/<feature>s` met een `Add<Feature>`-Command. De actie en Service-methode heten zoals het Command (`AddSaltOrder` → `AddSaltOrderAsync`), geven `Task` zonder body terug en hebben een `CancellationToken` als laatste parameter.
- Elke actie: `[ProducesResponseType]` voor 200 en elke foutcode die hij kan geven.
- Anders dan in UpNext geen publieke id op een `Add`-Command: zonder opslag is er niets om een retry mee tegen te houden.
- Alle properties zijn `required`, ook optionele (`required T?`). Validatie per type:

| Veld | Attributen |
|---|---|
| tekst | `[Length]`/`[MaxLength]` + `[NoSurroundingWhitespace]`; de frontend trimt, de API weigert |
| tekst op één regel (komt in een onderwerp of adresregel) | daarnaast `[NoControlCharacters]` |
| e-mail / telefoon | `[EmailAddress]` + `[MaxLength(254)]` / `[Phone]` + `[Length]` |
| lijst | `[Length]` + `[DisallowNullItems]` |
| getal / enum | `[AllowedValues]` of `[Range]` / `[EnumDataType]` |

- JSON via System.Text.Json. Enums gaan als camelCase-string over de lijn (`"delivery"`, zoals de TS-types), met `allowIntegerValues: false`.

## Fouten en configuratie

- `Exceptions/`: `DomainException` met statuscode. `ExceptionHandlingMiddleware` maakt er `ProblemDetails` van en staat als eerste in de pipeline. Messages zijn Engels en bevatten geen persoonsgegevens.
- Instellingen via een Options-class met `ValidateDataAnnotations()` en `ValidateOnStart()`, gelezen via `IOptions<T>`. De ontvangstadressen staan in `Mail` (`appsettings.json`).

## Rate limiting

- Token bucket via `RateLimitOptions.CreateTokenBucket`, per IP (`ToRateLimitPartitionKey()`, IPv6 per /64). Elk endpoint heeft een eigen policy.
- Een endpoint dat mailt naar een adres dat de bezoeker zelf invult (de bevestiging van een zoutbestelling), krijgt daarnaast een limiet per e-mailadres in de Service (`ISaltOrderEmailLimiter`). Anders mailbomt iemand vanaf veel IP's een vreemde via onze afzender.
- Achter Caddy of nginx: zet het netwerk van de proxy in `Api:TrustedProxyNetworks` (bv. `127.0.0.1/32`). Zonder die instelling deelt iedereen het IP van de proxy, en dus één limiet. Zet `ASPNETCORE_FORWARDEDHEADERS_ENABLED` niet.

## Mail

- De mail aan Water Zacht heeft de klant als reply-to. De bevestiging aan de klant heeft het ontvangstadres als reply-to.
- Eerst gaat de mail aan Water Zacht: die mail is de bestelling. Faalt hij, dan krijgt de client een 500 en toont hij telefoon en e-mail. Daarna gaat de bevestiging, met `CancellationToken.None`. Faalt die, dan wordt het gelogd en slaagt het request toch.
- Log nooit formulierinhoud of e-mailadressen.
- De zoutregels (zakgroottes, minimum bij bezorgen, maximum) staan zowel in `Constants/SaltOrderConstants.cs` als in `src/Config/saltOrder.ts`. Wijzig ze samen.

## C#-stijl

- Namespace `WaterZacht.API.<Map>`. PascalCase voor types, members en `const`; `Async`-suffix.
- Een witregel tussen alle members; attributen direct boven hun member. StyleCop controleert geen `record`s, dus daar zelf op letten.
- Services en Validators gebruiken een klassieke constructor met `_camelCase`-fields, en een `if` met één statement zonder braces. Controllers en Middleware gebruiken primary constructors.
- Geen expression-bodied methods of constructors. Een get-only property mag wel (`StatusCode => ...`).
- Zo min mogelijk comments: alleen voor een valkuil op precies die plek. Een `!` krijgt een `// ! <reden>` erboven.
- Analyzers (StyleCop, Roslynator, Sonar, Nullable.Extended) staan aan. Regels die tegen deze conventies ingaan, staan uit in `server/.editorconfig`.

## Testen

- xUnit + Moq: `Domain/Services/`, `Domain/Validators/`, `Fixtures/` (`FakeHttpMessageHandler`, `FakeLogger`) en `Dummies/Dummy`.
- Mock alleen interfaces. Een externe HTTP-API test je met `FakeHttpMessageHandler`.
- Arrange-Act-Assert met commentaar-blokjes, naam `Method_Scenario_ExpectedResult`, één scenario per test. Het happy path en elke `DomainException` krijgen een eigen test.
