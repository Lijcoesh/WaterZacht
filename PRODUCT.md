# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Twee groepen die even zwaar wegen:

- **Nieuwe klanten**: huiseigenaren in het Westland en omgeving die last hebben van kalk en overwegen een waterontharder te nemen. Ze oriënteren zich, willen vertrouwen krijgen in wie er bij hen thuis komt, en vragen een offerte of advies aan huis aan (`/contact`), of bellen.
- **Bestaande klanten**: mensen met een Kinetico-ontharder van Water Zacht die zout nabestellen (`/zout-bestellen`), om af te halen in De Lier of te laten bezorgen. Zout moet bij Water Zacht worden afgenomen in verband met de garantie (te bevestigen, zie launch-checklist).

Geen bijzondere doelgroepeisen bevestigd buiten WCAG AA.

## Product Purpose

De website van Water Zacht: informeert over waterontharding en het Kinetico-systeem, en levert twee dingen op: offerteaanvragen van nieuwe klanten en zoutbestellingen van bestaande klanten. Beide formulieren gaan via de API in `server/` als mail naar Water Zacht. Succes is een aanvraag of bestelling die zonder telefoontje heen en weer compleet binnenkomt, of een bezoeker die belt.

## Positioning

**De lokale vakman eerst.** Water Zacht is een dochter van Loodgietersbedrijf Martin van Wingerden (De Lier, Westland). Martin geeft persoonlijk advies bij u thuis, en installatie en service blijven in eigen hand bij eigen loodgieters. Kinetico is het bewijs van zijn keuze, niet het hoofdverhaal: een bewust gekozen merk (zonder elektra, regeneratie op waterdruk, 10 jaar garantie zonder onderhoudscontract). Een webshop of landelijke dealer kan het Kinetico-verhaal kopiëren, maar niet de loodgieter uit de buurt die zelf langskomt.

## Operating Context

- Bedrijf: Water Zacht, Leemidden 38, 2678 ME De Lier, 0174-240052, info@waterzacht.nl (`src/Config/contact.ts`). Moederbedrijf: lmvw.nl.
- Verkoop loopt via een gesprek: offerte op maat en advies aan huis, geen online verkoop van ontharders.
- Zout: zakken van 15 en 25 kg, afhalen of bezorgen; bij bezorgen een minimum per maat (`src/Config/saltOrder.ts`, gespiegeld in `server/Constants/SaltOrderConstants.cs`).
- Pagina's: home, `/systemen`, `/over-ons`, `/contact`, `/faq`, `/zout-bestellen`, `/privacy`.
- De PO (Martin) beheert de site niet zelf; content moet onderhoudsarm zijn.

## Capabilities and Constraints

- React 19 + Vite + MUI, backend ASP.NET Core zonder database; mail via Brevo; hosting op een eigen VPS (TransIP).
- **Geen bedragen** op de site (prijzen, kosten, besparingen in euro's, btw): voor prijzen verwijzen naar contact of offerte.
- **Geen social media**: geen knoppen, feeds of "beoordeel uw ervaring".
- Geen cookies of local storage, dus geen cookiebanner. Blijft dat zo, dan blijft dat een randvoorwaarde voor nieuwe features.
- Taal: Nederlands, de bezoeker wordt met "u" aangesproken.
- Open punten in teksten staan zichtbaar in een gele `OpenPoint`, niet als stille placeholder.
- Nog onbeslist: of de systemenpagina blijft, of er een productpagina komt, levertijd voor afhalen, of telefoon én e-mail allebei verplicht zijn (zie `Gesprek-PO.md`).

## Brand Commitments

- Naam: Water Zacht. Martin van Wingerden is het gezicht van het bedrijf.
- Toon: persoonlijk, nuchter, vakkundig; "wij komen graag bij u langs".
- Kinetico-logo en productbeelden alleen met toestemming van Kinetico (nog te regelen).
- Een foto die als "Martin" wordt gepresenteerd, moet Martin zijn; nooit een stockfoto van een willekeurig persoon.

## Evidence on Hand

- Teksten en claims van de oude site (waterzacht.nl) en lmvw.nl; foto's daarvan in `src/Resources/Images` (herkomst in `src/Resources/README.md`).
- Kinetico-feiten: bestaat sinds 1970, regeneratie op waterdruk, 10 jaar garantie op onderdelen waarvan 2 jaar all-in.
- **Nog niet onderbouwd** (alleen tonen met `OpenPoint` of na bevestiging): "Ferrari van de waterzuivering", "30% zuiniger in zout", "tot 98% gefilterd", "volgens het RIVM", CE- en Vras-certificaat, "meest compact met het hoogste rendement", "Kinetico approved dealer", de gezondheidsclaim over eczeem/huid, "opgericht in 2006".
- **Ontbreekt**: reviews of testimonials, klantaantallen, video, een foto van Martin aan het werk, KvK- en btw-nummer. Niet verzinnen.

## Product Principles

1. **Martin komt langs.** Elke pagina maakt duidelijk dat er een echte, lokale vakman achter zit; dat weegt zwaarder dan productspecificaties.
2. **Twee deuren, even breed.** Offerte aanvragen en zout bestellen zijn allebei snel te vinden; de ene mag de andere niet wegdrukken.
3. **Bellen is altijd een optie.** Het telefoonnummer is nooit ver weg.
4. **Alleen wat klopt.** Geen bedragen, geen onbewezen claims zonder `OpenPoint`, geen nepbewijs.
5. **Onderhoudsarm.** Niets op de site dat de PO moet bijhouden (prijzen, feeds, actuele data).

## Accessibility & Inclusion

WCAG 2.2 AA: contrast (al aangepast t.o.v. het design, zie `src/colors.ts`), toetsenbordbediening met zichtbare focus, alt-teksten. Zie de launch-checklist.
