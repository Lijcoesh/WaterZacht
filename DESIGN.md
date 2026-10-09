---
name: Water Zacht
description: Waterontharders van de loodgieter uit het Westland, strak en vakkundig gepresenteerd.
colors:
  green: "#86BC25"
  green-hover: "#6BA015"
  green-dark: "#557B10"
  green-light: "#A9DC5B"
  green-tint: "#F1F7E4"
  green-tint-strong: "#EEF7DC"
  blue: "#0D77A5"
  blue-bright: "#1890C4"
  blue-stripe: "#7FCCEB"
  navy: "#062230"
  navy-deep: "#041A24"
  ink: "#0B2A36"
  slate: "#4E6E7B"
  slate-dark: "#3E606E"
  muted: "#56737F"
  on-dark-nav: "#CFE3EA"
  on-dark-hero: "#BCD6E0"
  on-dark-muted: "#7FA8B8"
  on-dark-faint: "#6E93A3"
  on-dark-link: "#8FB3C1"
  background: "#F3F7F8"
  surface: "#F5F9FA"
  input-background: "#F8FBFC"
  placeholder-background: "#E9F0F2"
  track: "#EDF3F5"
  border: "#DCE7EB"
  border-soft: "#E3EBEE"
  border-input: "#D3E1E7"
  white: "#FFFFFF"
  error: "#C62828"
  open-point: "#FFE58A"
  open-point-border: "#B98900"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(38px, 5.2vw, 72px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(28px, 3.2vw, 44px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  title-sans:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  stat:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(28px, 2.6vw, 38px)"
    fontWeight: 300
    lineHeight: 1
  lead:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(17px, 1.4vw, 20px)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.03rem"
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.69rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
  button:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  none: "0px"
  sm: "3px"
  md: "4px"
  bar: "5px"
  full: "50%"
spacing:
  unit: "8px"
  gutter-sm: "20px"
  gutter: "28px"
  section: "clamp(56px, 7vw, 104px)"
  content: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.navy}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "11px 18px"
  button-primary-large:
    backgroundColor: "{colors.green}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sm}"
    padding: "16px 28px"
  button-outline-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "10px 17px"
  step-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  step-toggle-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  input-filled:
    backgroundColor: "{colors.input-background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
  choice-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "18px 18px 18px 16px"
  choice-card-checked:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "18px 18px 18px 16px"
  benefit-card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "clamp(20px, 2.2vw, 28px)"
  icon-badge:
    backgroundColor: "{colors.green-tint-strong}"
    textColor: "{colors.green-dark}"
    rounded: "{rounded.full}"
    size: "56px"
  cta-card:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "clamp(32px, 5vw, 72px)"
  header:
    backgroundColor: "rgba(6, 34, 48, 0.96)"
    textColor: "{colors.on-dark-nav}"
    padding: "14px 28px"
  footer:
    backgroundColor: "{colors.navy-deep}"
    textColor: "{colors.on-dark-link}"
  link:
    textColor: "{colors.blue}"
  link-hover:
    textColor: "{colors.green-dark}"
  underline-link:
    textColor: "{colors.navy}"
    padding: "0 0 3px"
  open-point:
    backgroundColor: "{colors.open-point}"
    textColor: "{colors.ink}"
---

# Design System: Water Zacht

## Overview

**Creative North Star: "Strak vakwerk"**

De site is gebouwd zoals een goede loodgieter een installatie oplevert: leidingen recht en evenwijdig, elke verbinding precies, niets wat er niet hoeft te zitten, en materiaal dat er na jaren nog goed uitziet. Luxe zit hier niet in glans of decoratie, maar in afwerking: een serif die rust uitstraalt in de koppen, ruime witmarges, bijna rechte hoeken en kleurvlakken die strak tegen elkaar aan liggen.

Het palet is koel en schoon (blauwgrijze vlakken, diep navy), met één levendig merkgroen als handtekening. Diepte komt van wisselende vlakken, niet van schaduw: wit, lichtblauwgrijs, navy en een blauwe band wisselen elkaar af als de lagen van een doorsnede. Zo leest een lange homepage als een rustige reeks hoofdstukken.

De dichtheid is laag tot gemiddeld: grote koppen en veel ruimte op de verkooppagina's, compacter en heel duidelijk in de formulieren (offerte, zout bestellen), waar de bezoeker iets moet doen.

**Key Characteristics:**
- Newsreader-serif voor koppen en grote cijfers, IBM Plex Sans voor alles wat je leest of bedient.
- Navy als fundament (header, hero, donkere blokken), groen als accent: knoppen, een dunne bovenrand, vinkjes.
- Vlak in rust: geen kaartschaduwen; lagen via tonale vlakken.
- Bijna rechte hoeken (3–4px); velden zonder hoeken met alleen een onderlijn.
- Contrast boven het oorspronkelijke design: tinten zijn waar nodig donkerder gemaakt voor WCAG AA.

## Colors

Een koel, waterig palet van navy en blauwgrijs, met één helder groen dat alleen verschijnt waar iets gedaan kan worden of klopt.

### Primary
- **Westlands Groen** (green): de merkkleur. Achtergrond van primaire knoppen, de 3px-bovenrand van donkere blokken, het eerste segment van de garantiebalk en accenten op navy. Nooit als tekstkleur op wit (te weinig contrast).
- **Kasgroen** (green-hover / green-dark): green-dark voor de hover van links op licht, iconen, vinkjes, aangevinkte keuzes en succes; green-hover alleen als donkere variant van de groene knop (haalt als tekst op wit geen 4.5:1).
- **Groene Waas** (green-tint / green-tint-strong): de zachte groene vlakken achter icoonbadges, aangevinkte keuzekaarten en bevestigingen.

### Secondary
- **Diep Leidingblauw** (blue): links, de onderlijn van een veld in focus, de focusrand, en de blauwe garantieband (met alleen witte tekst erop).
- **Helder Waterblauw** (blue-bright / blue-stripe): alleen voor grote cijfers en de gestreepte voortgangsbalk; haalt 3:1, dus niet voor gewone tekst.

### Neutral
- **Nachtnavy** (navy): header, hero, donkere blokken, koppen op licht en de tekst op groene knoppen.
- **Diepzee** (navy-deep): footer en hover van navy-vlakken.
- **Inkt** (ink): broodtekst en tekst in velden.
- **Leisteen** (slate / slate-dark / muted): secundaire tekst, beschrijvingen, placeholders en randen van radioknoppen.
- **Tekst op donker** (on-dark-nav, on-dark-hero, on-dark-muted, on-dark-faint, on-dark-link): vijf tinten voor tekst op navy, van navigatie (lichtst) tot kleine footertekst; elk gekozen op contrast.
- **Kalkvrij Wit en Mistgrijs** (white, background, surface, input-background, track, placeholder-background): de lichte vlakken. Wit en background wisselen per sectie af.
- **Haarlijnen** (border, border-soft, border-input): 1px-scheidingen en randen.

### Utility
- **Foutrood** (error): foutmeldingen bij velden.
- **Open-punt-geel** (open-point / open-point-border): alleen voor `OpenPoint`-markeringen in concepttekst. Moet vóór de livegang van elke pagina verdwenen zijn.

### Named Rules
**De Navy-op-Groen-regel.** Tekst op een groene knop is altijd navy, nooit wit. Wit op dit groen haalt 2.3:1, navy 7.2:1.

**De Groene-Draad-regel.** Groen is een accent: knoppen, een bovenrand, een vinkje, een balksegment. Een groot groen vlak of groene broodtekst hoort er niet in.

**De Contrast-wint-regel.** Waar `src/colors.ts` bij een kleur de waarde uit het design noemt, is die bewust verlaten om AA te halen. Zet hem nooit terug.

## Typography

**Display Font:** Newsreader (met Georgia, serif)
**Body Font:** IBM Plex Sans (met system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** Een rustige, licht redactionele serif tegenover een technische, heldere sans: het verhaal klinkt als een vakblad, de bediening als een goed gereedschap.

### Hierarchy
- **Display** (Newsreader 400, clamp(38px, 5.2vw, 72px), 1.02, -0.02em): één per pagina, de h1 in hero of paginakop.
- **Headline** (Newsreader 400, clamp(28px, 3.2vw, 44px), 1.1, -0.02em): sectiekoppen (h2) via `SectionHeading`.
- **Title** (Newsreader 400, 1.5rem, 1.2): kleinere serif-koppen (h3).
- **Title Sans** (Plex Sans 600, 1.125rem, 1.3): kaarttitels en periodes (h4, vaak als h3 gerenderd).
- **Stat** (Newsreader 300, clamp(28px, 2.6vw, 38px), 1): grote kerncijfers, zoals in de statsbalk van de hero.
- **Lead** (Plex Sans 400, clamp(17px, 1.4vw, 20px), 1.6): de intro onder de h1 in de hero.
- **Body** (Plex Sans 400, 1.03rem, 1.65): broodtekst; intro's begrensd op ±33–36em.
- **Body Small** (Plex Sans 400, 0.875rem, 1.5): hulpteksten en kleine beschrijvingen.
- **Label** (Plex Sans 500, 0.69rem, 0.16em, hoofdletters): kleine labels boven waarden en velden.
- **Button** (Plex Sans 600, 0.9rem / 1rem groot, 1, geen hoofdletters).

### Named Rules
**De Serif-vertelt-regel.** Newsreader is voor koppen en grote cijfers: wat de bezoeker leest als verhaal. Alles wat je bedient (knoppen, velden, navigatie, labels) is Plex Sans.

**De Gewone-Letters-regel.** Knoppen en koppen staan nooit in hoofdletters; hoofdletters met spatiëring zijn alleen voor het kleine label.

## Layout

Eén inhoudsbreedte voor de hele site: 1280px plus een gutter van 28px (20px onder `sm`). Secties krijgen verticale ruimte van clamp(56px, 7vw, 104px) en wisselen van achtergrond (white en background, met navy en blue als donkere ankers), zodat de grens tussen secties door het vlak wordt gemaakt en niet door een lijn.

Binnen secties: twee kolommen op desktop (tekst naast foto of kaarten, vaak 2fr/1fr of gelijk), één kolom vanaf `md` (900px). Kaartrasters gebruiken `auto-fit` met een minimumbreedte. De sticky header laat 80px vrij bij ankers (`scroll-margin-top`).

Breakpoints zijn die van MUI (sm 600, md 900, lg 1200); geen eigen media queries. Geen `minHeight` naast `aspectRatio`: op kleinere schermen een hogere verhouding per breakpoint.

### Named Rules
**De Waterpas-regel.** Alles lijnt uit op de containerrand. Een kolom of statscel die afwijkt (zoals de eerste en laatste statscel zonder buitenpadding), doet dat om de buitenrand recht te houden.

## Elevation & Depth

Vlak in rust. Papier heeft standaard elevation 0; kaarten liggen als een iets ander vlak (background op wit, wit op background) in plaats van te zweven. Diepte komt uit de afwisseling van tonale lagen en uit de donkere navy-blokken. De navy-blokken hebben soms een zachte radiale blauwe gloed in de hoek en een groene bovenrand van 3px. De header is navy op 96% met 8px backdrop-blur.

### Shadow Vocabulary
- **Soft** (`0 1px 2px rgba(6,34,48,0.06)`): MUI elevation 1–2; nauwelijks zichtbaar, voor als een vlak toch los moet komen.
- **Medium** (`0 8px 20px -8px rgba(6,34,48,0.6)`): alleen voor een element dat je vastpakt, zoals de greep van de vergelijkingsslider.
- **Strong** (`0 12px 24px -12px rgba(6,34,48,0.6)`): elevation 9+, nu ongebruikt.

### Named Rules
**De Vlak-in-rust-regel.** Geen schaduw onder kaarten, foto's of secties. Een schaduw betekent "dit kun je bewegen", niet "dit is belangrijk".

## Shapes

Strakke, bijna rechte vormen. Knoppen en keuzeknoppen 3px, kaarten en blokken 4px, velden 0 (alleen een onderlijn). Rond is gereserveerd voor wat echt rond is: icoonbadges, radioknoppen en de afgeronde segmenten van de garantiebalk (5px). Randen zijn 1px haarlijnen; een gekozen keuzekaart krijgt een dubbele rand via een inset van 1px.

### Named Rules
**De Drie-Pixel-regel.** Bedieningselementen 3px, vlakken 4px, velden 0. Groter afronden maakt het zachter en goedkoper; dat is niet deze wereld.

## Components

### Buttons
Strak en zeker: een vlak blok met duidelijke tekst, geen schaduw.
- **Shape:** bijna recht (3px).
- **Primary:** groen met navy tekst, Plex Sans 600; 11px 18px (0.9rem), groot 16px 28px (1rem). Hover houdt de kleur en filtert 7% donkerder (`brightness(0.93)`).
- **Outline op donker:** transparant, witte tekst, rand wit op 40%; hover vult met wit op 12%. Één pixel minder padding dan de primaire knop, zodat ze even hoog zijn.
- **Focus:** 2px blauwe outline met 2px offset op elk `ButtonBase`-element, centraal in het theme.

### Step Toggles
- **Style:** lichte keuzeknoppen (surface, 1px rand, ink-tekst, 600) voor de stappen in "De werking"; gekozen wordt vol navy met witte tekst. Overgang 0.2s.

### Cards / Containers
- **Corner Style:** 4px.
- **Background:** background op een witte sectie (voordelenkaarten), wit op een lichte sectie (formulieren), navy voor afsluitende CTA- en moederbedrijfblokken.
- **Shadow Strategy:** geen (zie Elevation).
- **Border:** geen, of een 1px haarlijn bij selecteerbare kaarten.
- **Internal Padding:** clamp(20px, 2.2vw, 28px) voor kaarten, clamp(32px, 5vw, 72px) voor grote navy-blokken.

### Icon Badge
Een rond badge van 56px in green-tint-strong met een green-dark Material-icoon van 30px, naast een Title Sans-kop. Het vaste beeldmerk van een voordelenlijst. Vinkjes in een opsomming zijn een Material `Check`-icoon in green-dark, nooit een ✓-teken.

### Inputs / Fields
- **Style:** gevuld vlak (input-background), geen hoeken, ink-tekst, 13px 14px padding; een onderlijn in border-input.
- **Focus:** de onderlijn wordt blauw; het vlak blijft gelijk.
- **Error:** foutrood onder het veld via `FormField`; label altijd zichtbaar boven het veld.

### Choice Cards
Selecteerbare kaarten (afhalen of bezorgen) rond een native radio die zelf is gestyled en met toetsen bedienbaar blijft. Wit met een 1px rand; hover maakt de rand muted; gekozen: green-tint, green-dark rand plus 1px inset, en een gevulde green-dark radio met witte ring. Overgangen 0.15s.

### Navigation
Sticky navy-balk (96%, blur 8px, witte haarlijn onder). Links in Plex Sans 500, 14px, on-dark-nav, hover wit; de huidige pagina is wit met een groene onderstreping van 2px (offset 8px). De tagline onder de merknaam volgt het Label (0.69rem, 0.16em). Rechts een outline-knop en een primaire knop. Onder `md` gaat de navigatie naar een navy menu achter een menuknop; op een telefoon verhuist "Zout bestellen" naar dat menu, direct onder Home en vóór Contact. Er is een skip-link die bij focus zichtbaar wordt.

### Links
- **Inline:** blauw zonder onderstreping, hover green-dark.
- **Underline Link:** navy, Plex Sans 600 op body-grootte, met een groene onderrand van 1px en 3px ruimte; hover green-dark. Op donker (`dark`): wit, hover maakt de onderrand wit. Voor de acties binnen secties, zoals "Zout bestellen" bij het zoutvat.

### Open Point
Gele markering (open-point met een rand in open-point-border) met het label "Open punt:" voor tekst die de PO nog moet bevestigen. Hoort niet bij het eindbeeld.

## Do's and Don'ts

### Do:
- **Do** importeer elke kleur uit `src/colors.ts` en elke maat uit `src/Theme/sizes.ts`; nooit hardcoded hex.
- **Do** zet navy tekst op groene vlakken en alleen wit op het blauw van de garantieband.
- **Do** wissel sectieachtergronden af (white / background, met navy of blue als anker) om secties te scheiden.
- **Do** houd elke focusrand zichtbaar: 2px blue, offset 2 (3 bij radio's).
- **Do** respecteer `prefers-reduced-motion`; bewegingen blijven kort (0.15–0.25s ease).

### Don't:
- **Don't** gebruik kaartschaduwen of zwevende kaarten; schaduw is alleen voor iets wat je vastpakt.
- **Don't** rond verder af dan 4px, behalve bij wat echt rond is (badges, radio's).
- **Don't** zet groen als tekst op wit of als groot vlak.
- **Don't** gebruik Newsreader voor knoppen, labels of velden, en zet knoppen niet in hoofdletters.
- **Don't** gebruik de lichtere waarden uit het oorspronkelijke design waar `src/colors.ts` ze heeft verdonkerd.
- **Don't** zet social-mediaknoppen of feeds in het ontwerp.
