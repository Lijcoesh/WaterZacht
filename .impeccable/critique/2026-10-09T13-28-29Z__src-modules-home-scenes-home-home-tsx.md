---
target: homepage
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Development\\School\\WaterZacht\\src\\Modules\\Home\\Scenes\\Home\\Home.tsx"
target_fingerprint: "sha256:97b71105fae2a39e913655b3f4cf1c927a3597acaffb1470ea2209e9fe433f9d"
target_path: "C:\\Development\\School\\WaterZacht\\src\\Modules\\Home\\Scenes\\Home\\Home.tsx"
timestamp: 2026-10-09T13-28-29Z
slug: src-modules-home-scenes-home-home-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

# Critique: homepage (src/Modules/Home/Scenes/Home/Home.tsx)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Desktop-nav toont geen actieve pagina (Header.tsx:161 gebruikt Link, geen NavLink); mobiel menu wel |
| 2 | Match System / Real World | 2 | Jargon: "ionenuitwisseling, natriumionen" (HowItWorks.tsx:125), "Vras", "mini KB", "hals van de flessen" (Kinetico.tsx:16-20) |
| 3 | User Control and Freedom | 3 | Vergelijkingsslider blokkeert verticaal scrollen op touch (Comparison.tsx:48) |
| 4 | Consistency and Standards | 2 | Twee logo's (serif-woordmerk vs scriptlogo footer); "Contact" vs "Gratis offerte" voor hetzelfde doel; niet-klikbare tags die op knoppen lijken; 4 footerlinks naar één anker |
| 5 | Error Prevention | 3 | Misleidende bestemmingen: "Meer over drinkwaterzuivering" opent het contactformulier |
| 6 | Recognition Rather Than Recall | 3 | Op mobiel zit "Zout bestellen" alleen achter de menuknop |
| 7 | Flexibility and Efficiency | n/a | Marketingpagina, geen herhaalde workflows |
| 8 | Aesthetic and Minimalist Design | 2 | 8 secties, lijst van 11 Kinetico-punten, "30%" / "10 jaar" / "geen elektra" elk 3× herhaald |
| 9 | Error Recovery | 3 | Geen foutgevoelige flows; bellen altijd als terugval |
| 10 | Help and Documentation | n/a | FAQ is een aparte pagina |
| **Total** | | **21/32** | **Acceptable (66%)** |

## Design Specificity Verdict

**LLM assessment**: Verzorgd en consistent met DESIGN.md, maar grotendeels inwisselbaar met elke premium ontharderdealer. De positionering is omgekeerd: PRODUCT.md zegt "lokale vakman eerst", de pagina zet Kinetico vooraan en Martin achteraan. Hero is een stockbadkamer (met toilet centraal), daarna een standaard statsbalk en een 6-kaartengrid met Material-iconen. Martin wordt pas in ClosingCta genoemd, zonder foto; Westland/De Lier staan alleen in de footer. Specifiek en sterk: de vergelijkingsslider (kalk op een warmte-element), de garantiebalk op schaal (2 van 10 jaar), het zoutvat in stap 02.

**Deterministic scan**: Bronscan (src/Modules/Home + src/Components) exit 0, 2 adviezen `design-system-font-size`: Hero.tsx:53 (clamp 17–20px, intro) en UnderlineLink.tsx:19 (0.97rem), beide buiten de DESIGN.md-schaal; ontstaan pas door DESIGN.md. URL-scan 1280px: `undersized-ui-text` (tagline 9px, Header.tsx:84, echt), `line-length` ±104 tekens in #werking-panel (HowItWorks.tsx:106 maxWidth 46em, echt), `side-tab` (3px groene bovenrand ClosingCta.tsx:30-38, bewuste signatuur uit DESIGN.md, false positive), `repeating-stripes-gradient` (functionele voortgangsbalk, false positive). URL-scan 390px: `low-contrast` op hero-titel en intro: false positive (detector negeert de navy overlay van 72% onder md). Gerenderde DOM: koppenstructuur klopt, alle 11 afbeeldingen met juiste alt, alle 32 bedienbare elementen met naam, landmarks en skip-link aanwezig, geen dubbele ids, geen horizontale overflow op 390px.

**Visual overlays**: Geen; er was geen browser-automatiseringstool voor scriptinjectie. URL-modus van de detector gebruikt.

## Overall Impression

Technisch en toegankelijk solide, visueel netjes, maar het verhaal klopt niet met de positionering: de pagina verkoopt een merk, niet de vakman. Grootste kans: Martin en "wij komen bij u langs" naar voren halen, en de zoutdeur op mobiel even breed maken als de offertedeur.

## What's Working

- **Vergelijkingsslider** (Comparison.tsx): het enige visuele bewijs dat echt voor dit product is gemaakt, en volledig toegankelijk (role=slider, pijltjes/Home/End, aria-valuetext, focusring).
- **Garantiebalk op schaal** (Guarantees.tsx:10-24,137-145): 2+8 jaar als data in plaats van decoratie; in één oogopslag leesbaar.
- **ClosingCta**: beide deuren naast elkaar plus "Of bel direct"; voert principes 2 en 3 precies uit, en past exact in DESIGN.md.

## Priority Issues

- **[P0] Bedrag en feitelijke onjuistheid op de pagina**
  - Why it matters: "€ 250,- gemiddelde besparing per jaar" (Hero.tsx:13) schendt de projectregel "geen bedragen" en is het eerste cijfer dat een bezoeker leest. "hetzelfde element" (Comparison.tsx:171) klopt niet: het zijn twee verschillende elementen (staat al in de launch-checklist).
  - Fix: vervang de €250-stat door een lokaal feit (bv. "Advies aan huis") of een bevestigd feit; "hetzelfde element" → "een vergelijkbaar element". Tekstwijziging laten bevestigen.
  - Suggested command: /impeccable clarify
- **[P1] "Martin komt langs" ontbreekt; Kinetico domineert**
  - Why it matters: vertrouwen in wie er bij u thuiskomt is voor nieuwe klanten de doorslag; nu kan een webshop deze pagina kopiëren.
  - Fix: H1 en hero rond de lokale vakman; een strook "Zo gaat het" (u belt of vraagt aan → Martin komt langs → eigen loodgieters installeren) direct na de hero; Kinetico-sectie terugbrengen naar "bewijs van zijn keuze"; foto van Martin zodra bevestigd. Teksten met de PO afstemmen.
  - Suggested command: /impeccable shape (daarna /impeccable layout)
- **[P1] Zoutdeur smaller dan offertedeur op mobiel**
  - Why it matters: bestaande klanten bestellen vaak op de telefoon; principe 2 ("twee deuren, even breed").
  - Fix: "Al klant? Zout bestellen →" onder de heroknoppen; links bij stap 02 (HowItWorks.tsx:21) en "E-mailservice zoutvat" (Guarantees.tsx:176); zout bovenaan het mobiele menu.
  - Suggested command: /impeccable adapt
- **[P2] Slider blokkeert scrollen op touch**
  - Why it matters: een veeg op de ±290px hoge afbeelding scrolt de pagina niet; bezoeker zit vast halverwege.
  - Fix: `touchAction: 'pan-y'` op de stage en alleen horizontaal slepen verwerken, of pointer capture alleen op de greep; greep groter dan 42px.
  - Suggested command: /impeccable harden
- **[P2] Brochure-overload en jargon**
  - Why it matters: oudere bezoekers haken halverwege af; herhaling verzwakt claims.
  - Fix: 3–4 kernpunten bij Kinetico, rest naar /systemen; "Hoe werkt" in gewone taal; claims niet 3× herhalen; Drinkwater samenvoegen of na de garantie weghalen.
  - Suggested command: /impeccable distill

## Persona Red Flags

- **Jordan (eerste keer)**: H1 zegt niet wat er verkocht wordt of door wie; "ionenuitwisseling/natriumionen", "Vras", "mini KB"; niet uitgelegd wat een offerte inhoudt (gratis, vrijblijvend, Martin komt langs).
- **Riley (stresstester)**: waar komt €250 vandaan; "30% minder dan andere toestellen" welke; foto's "hetzelfde element" verschillen zichtbaar; "Meer over drinkwaterzuivering" opent contact; Ontijzering/Drukverhoging/Vloeistoffilters in de footer landen allemaal op /#drinkwater; "E-mailservice zoutvat" zonder aanmeldroute.
- **Casey (mobiel)**: zout verstopt in menu; pagina ±10,6 schermen lang; slider blokkeert scrollen. Goed: grote belknop in de hero.
- **Oudere huiseigenaar uit het Westland**: tagline van 9px in hoofdletters (Header.tsx:84); grijs label van 11px (Kinetico.tsx:113); geen gezicht, geen lokale verwijzing; eerste beeld is een toilet.
- **Bestaande klant (zout)**: desktop prima via de headerknop; mobiel menu of helemaal naar beneden; drie plekken noemen zout zonder bestellink.

## Minor Observations

- Groene ✓ op licht vlak (Kinetico.tsx:81-82) ±2.1:1, tegen de Groene-Draad-regel: gebruik greenDark.
- `minHeight: 280` naast `aspectRatio` (DrinkingWater.tsx:29-30), tegen de stylingconventie.
- Regellengte ±104 tekens in #werking-panel; naar ±65–75ch.
- Font-sizes buiten de schaal: Hero intro clamp(17–20px), UnderlineLink 0.97rem, tagline 9px: schaal uitbreiden met een "lead"-stap of waarden gelijktrekken.
- Desktop-nav zonder actieve pagina-markering.
- Twee verschillende logo's (header vs footer).
- Diensttags in Drinkwater lijken klikbaar maar zijn het niet.
- Voortgangsbalk met bewegende strepen loopt eindeloos (reduced motion wordt wel gerespecteerd).
- Wikimedia CC BY-SA-foto's in de slider zonder naamsvermelding (staat in launch-checklist).
- Ongefundeerde claims (30%, 98%, RIVM, Ferrari, CE/Vras, eczeem) komen van de oude site en staan al op de PO-lijst; geen OpenPoint nodig volgens CLAUDE.md (de oude site is een bron), wel laten bevestigen.

## Questions to Consider

- Als het enige wat een webshop niet kan kopiëren Martin aan de deur is, waarom opent de pagina op een toilet en zie je hem nergens?
- Als elke claim die niet te onderbouwen is wegviel, zouden de slider, de garantiebalk en "Martin komt langs" de pagina dan dragen? Waarschijnlijk wel, en sterker.
- Moet de headerknop op mobiel "Zout bestellen" zijn in plaats van "Contact", nu offerte en bellen al in de hero staan?
