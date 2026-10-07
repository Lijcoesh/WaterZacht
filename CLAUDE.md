# WaterZacht

React 19 + Vite + TypeScript + MUI. Backend voor de formulieren in `server/`: ASP.NET Core (.NET 10), mail via Brevo, productie op een eigen VPS.

| Commando | Doel |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | `tsc -b` + vite build |
| `npm run lint` | eslint |
| `npm run format` | prettier --write |
| `npm run format:check` | prettier --check (CI) |

## Kernconventies

- **Components**: één component per file, `export default function`, props via `interface IProps`. Zie @.claude/conventions/components.md
- **Styling**: `makeStyles` uit `tss-react/mui`, kleuren uit `src/colors.ts`, MUI breakpoints. Zie @.claude/conventions/styling.md
- **Imports**: absoluut via `src/*`, relatief binnen dezelfde map, `import type` voor types. Zie @.claude/conventions/imports.md
- **Theme**: opgesplitst in `src/Theme/` (palette, typography, shadow, sizes, `Components/`), `theme.ts` doet alleen compositie. Zie @.claude/conventions/styling.md
- **Structuur & naming**: zie @.claude/conventions/structure.md
- **Backend (`server/`)**: Controllers → Services + Validators, Commands met validatie-attributen, rate limiting, geen database. Zie @.claude/conventions/server.md
- **Content**: geen bedragen op de site (prijzen, kosten, besparingen in euro's, btw), want de PO wil die niet hoeven bijhouden. Voor prijzen verwijzen naar contact of een offerte.
- **Geen social media** op de site (geen Facebook- of Instagram-knoppen, feeds of "Beoordeel uw ervaring"): de PO is daar geen fan van.
- **TODO.md**: het werk in de volgorde waarin het af moet. Zet nieuw werk op de plek waar het in die volgorde hoort, en vink af of verwijder wat klaar is. Juridische en inhoudelijke details blijven in de launch-checklist. Vragen en beslissingen voor de PO gaan in `Gesprek-PO.md`.
- **Commits**: subject begint met een werkwoord in de gebiedende wijs, Engels, geen punt.
  `Add hero section`, `Fix avatar overflow`, `Move colors to src/colors.ts` — niet `Added ...` / `hero section`.

## Afronding: launch-checklist

Voordat het project als af wordt gemeld (oplevering, deploy, "klaar"): loop **altijd** de volledige checklist in @.claude/conventions/launch-checklist.md na — juridische pagina's, privacy/cookies, dark patterns, nepreviews en claims, toegankelijkheid, licenties. Controleer in de code, niet uit je hoofd. Meld per sectie wat gedaan, n.v.t. of openstaand is; het project is pas af als alles is opgelost of expliciet als n.v.t. gemotiveerd. Ontbrekende gegevens (bedrijfsdata, juridische tekst) vraag je aan mij — niet verzinnen.

Kom je tijdens het werk iets tegen dat hieronder valt (formulier, externe script, afbeelding, font)? Regel het meteen of noteer het onder "Openstaand" in die file.

## Conventies bijhouden

Kom je in een gesprek iets tegen dat ook voor later werk geldt — een correctie van mij, een uitgesproken voorkeur, een patroon dat we afspreken — leg het dan meteen zelf vast, in dezelfde beurt, zonder te vragen:

- Hoort het bij een bestaand onderwerp? Werk die file in `.claude/conventions/` bij (liever een bestaande regel aanscherpen dan een nieuwe toevoegen).
- Past het nergens? Zet er een korte regel over in dit bestand.
- Meld in één zin wat je hebt vastgelegd en waar.

Niet vastleggen: eenmalige keuzes die alleen voor de taak van dat moment gelden, en dingen die al uit de code, config of git-historie blijken. Blijkt een vastgelegde conventie later niet te kloppen? Pas hem aan of haal hem weg — niet een tweede regel ernaast zetten.
