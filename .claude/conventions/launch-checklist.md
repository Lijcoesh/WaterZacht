# Launch-checklist

Dingen die makkelijk vergeten worden maar juridisch, ethisch of qua toegankelijkheid zwaar wegen. Loop deze lijst door **voordat het project als af wordt beschouwd** (oplevering, deploy naar productie, "we zijn klaar"). Het project is pas af als elk punt is afgevinkt of expliciet als "n.v.t." is gemotiveerd.

## Werkwijze

- Tijdens het werk: kom je iets tegen dat hier onder valt (bv. een formulier, een externe script, een afbeelding), regel het meteen of noteer het onder "Openstaand" onderaan.
- Bij afronding: loop elk punt na, controleer in de code/content (niet uit je hoofd) en meld per sectie wat gedaan is, wat n.v.t. is en wat nog openstaat.
- Kun je iets niet zelf invullen (bv. bedrijfsgegevens, juridische tekst)? Vraag het aan de gebruiker, verzin niets, en laat het niet stilletjes als placeholder staan.
- Juridische teksten die je genereert zijn een concept; wijs erop dat ze door de eigenaar of een jurist gecontroleerd moeten worden.

## Juridische pagina's

- [ ] **Privacybeleid**: welke data, waarvoor, grondslag, bewaartermijn, derden, rechten van betrokkenen, contactpunt. Gelinkt vanuit de footer en bij elk formulier.
- [ ] **Algemene voorwaarden** (terms of service), indien er diensten/producten/accounts zijn.
- [ ] **Retour-/refundbeleid**, indien er iets verkocht wordt (incl. herroepingsrecht).
- [ ] **Cookiebeleid**: lijst van cookies/local storage met doel en looptijd.
- [ ] **Bedrijfsgegevens**: bedrijfsnaam, adres, e-mail, KvK-/BTW-nummer, waar wettelijk vereist. Zichtbaar (footer/contact/impressum).

## Privacy & data

- [ ] **Cookie consent banner**: geen niet-essentiële cookies/trackers vóór toestemming; weigeren even makkelijk als accepteren; keuze later te wijzigen.
- [ ] **Formulieren**: consent-checkbox waar nodig (niet vooraf aangevinkt), duidelijke link naar privacybeleid, alleen verplichte velden verplicht.
- [ ] **Geen onnodige data**: elk veld/tracking-punt heeft een reden; verwijder wat we niet nodig hebben (dataminimalisatie).
- [ ] **Third-party SDK's en scripts auditen**: `package.json`, `index.html`, embeds (analytics, fonts via CDN, chat, maps, video, pixels). Wat laden ze, wat sturen ze door, staat het in het privacybeleid, is er een verwerkersovereenkomst nodig?
- [ ] **Leeftijdstoestemming**: worden er gegevens van kinderen verzameld (of kunnen ze dat)? Zo ja: leeftijdscheck en ouderlijke toestemming volgens de lokale wet (AVG: onder 16, NL; elders vaak 13).
- [ ] **Data verwijderen**: gebruiker kan zijn gegevens/account laten verwijderen (of er is een duidelijk verzoekkanaal), en dit staat in het privacybeleid.
- [ ] **Uitschrijflink in e-mails**: elke marketing-/nieuwsbriefmail heeft een werkende, één-klik uitschrijflink en een afzenderadres.

## Eerlijkheid & dark patterns

- [ ] **Dark patterns verwijderen**: geen misleidende knoppen, verborgen opt-outs, valse urgentie/schaarste, confirmshaming, moeilijk op te zeggen, vooraf aangevinkte opties.
- [ ] **Geen verborgen kosten**: totaalprijs incl. btw, verzend- en servicekosten zichtbaar vóór afrekenen.
- [ ] **Geen nepreviews/testimonials**: alle reviews, logo's, ratings en cijfers zijn echt en verifieerbaar. Placeholder-content ("Jan Jansen, 5 sterren") is weg.
- [ ] **Geen onbewezen claims**: superlatieven, cijfers ("10.000 klanten"), certificeringen, garanties en "#1" zijn te onderbouwen, of verwijderd.

## Toegankelijkheid

- [ ] **Alt-tekst**: elke betekenisvolle afbeelding heeft beschrijvende `alt`; decoratieve afbeeldingen `alt=""`; icoonknoppen hebben `aria-label`.
- [ ] **Kleurcontrast**: WCAG AA (4.5:1 tekst, 3:1 grote tekst en UI-elementen), zowel in `src/colors.ts` als in het theme; check ook hover-/disabled-/focusstaten.
- [ ] **Toetsenbordnavigatie**: alles bedienbaar met Tab/Enter/Space/Esc, logische volgorde, zichtbare focusstijl (niet weghalen), geen keyboard traps in modals/menu's, skip-link naar hoofdinhoud.

## Licenties

- [ ] **Fonts en afbeeldingen**: elke font, foto, illustratie en icoon heeft een licentie die commercieel gebruik toestaat; bronvermelding waar vereist. Leg herkomst vast (bv. in `src/Resources/` README of `LICENSES.md`).
- [ ] **Dependencies**: geen pakketten met een licentie die niet bij het project past (bv. AGPL/GPL in een gesloten project).

## Openstaand

_Noteer hier tijdens het werk punten die vóór oplevering nog geregeld moeten worden. Leeg = niets bekend, niet = alles gedaan; loop de lijst hierboven altijd volledig na._

Uit de bouw van de homepage naar het Claude Design "Variant B" (oktober 2026):

- **Formulieren live zetten.** Beide formulieren posten naar de API in `server/` (oktober 2026), die via Brevo mailt. Nog te regelen: Brevo-account op naam van Water Zacht, afzenderdomein `waterzacht.nl` verifiëren (SPF/DKIM), `Brevo:ApiKey` en `Brevo:SenderEmail` als environment variables op de VPS, de API daar draaien achter Caddy/nginx (met `Api:TrustedProxyNetworks`) en de deploy inrichten. Brevo verwerkt namen, adressen en berichten en bewaart maillogs: verwerkersovereenkomst afsluiten en Brevo in het privacybeleid noemen.
- **Formulier**: link naar het privacybeleid ontbreekt nog. Nu zijn telefoon én e-mail allebei verplicht (zoals in het design). Laten bevestigen of beide nodig zijn (dataminimalisatie).
- **Privacyverklaring** bestaat niet. De link in de footer uit het design is weggelaten tot er een pagina is. Inhoud aanvragen bij de eigenaar.
- **Garantie- en leveringsvoorwaarden**: de link uit het design (sectie Kinetico) is weggelaten; tekst of pagina aanvragen.
- **Bedrijfsgegevens**: KvK- en btw-nummer ontbreken in het design. Aanvragen en in de footer zetten.
- **Social media**: de Facebook- en Instagram-knoppen en "Beoordeel uw ervaring" uit het design zijn weggelaten, omdat er geen URL's zijn.
- **Foto's van de oude sites** (oktober 2026): de "Foto nodig"-vakken zijn gevuld met beelden van waterzacht.nl en lmvw.nl (zie `src/Resources/README.md`). Nog te regelen: bevestigen dat `martin.jpg` Martin is, toestemming van Kinetico voor logo en productbeelden, originelen in hogere resolutie. De warmte-elementen in de vergelijkingsslider komen van Wikimedia Commons (CC BY-SA 3.0): naamsvermelding toevoegen op de site of vervangen door eigen foto's. Het zijn twee verschillende elementen, terwijl de tekst "hetzelfde element" zegt. `installation.jpg` toont een geplaatste ontharder, niet Martin zelf; een echte foto van Martin aan het werk ontbreekt nog. Gebruik geen stockfoto van een willekeurig persoon als "Martin".
- **Video in "De werking"**: het design toont een afspeelknop, maar er is geen video. De knop is weggelaten tot er een video-URL is (bij een YouTube-embed: privacy-enhanced mode en vermelden in het cookiebeleid).
- **Claims laten onderbouwen**: "de Ferrari van de waterzuivering", "30% zuiniger in zout", "tot 98% gefilterd", "volgens het RIVM", "CE- en Vras-certificaat", "meest compacte systeem mét het hoogste rendement", "Kinetico approved dealer", en de gezondheidsclaim over eczeem/huidklachten. De teksten komen van de huidige site; de eigenaar moet ze kunnen onderbouwen of aanpassen.
- **Zout verplicht bij Water Zacht afnemen "in verband met de garantie"** (FAQ): laten checken of dat zo in de voorwaarden staat.
- **Logo**: bevestigen dat `logo.png`/`droplet.png` van Water Zacht zelf zijn (zie `src/Resources/README.md`).
- **Contrast**: aangepast t.o.v. het design: navy tekst op groene knoppen (wit haalde 2.3:1), en donkerdere tinten voor links, labels en grote cijfers (zie `src/colors.ts`). Laten bevestigen door de eigenaar/ontwerper.
- **Blok over Loodgietersbedrijf Martin van Wingerden** (Over ons): tekst en dienstenlijst samengevat van lmvw.nl (oktober 2026). Laten bevestigen door de eigenaar, vooral "opgericht in 2006" en "vertrouwd adres in het Westland". Het lidmaatschap van Uneto-VNI van die site is bewust weggelaten (heet nu Techniek Nederland, niet gecontroleerd).

Uit de demo op GitHub Pages (oktober 2026):

- **`noindex`** in `index.html` houdt de demo uit zoekmachines. Weghalen bij de echte livegang. De productie draait op een eigen VPS (besloten oktober 2026): dan ook `base` in `vite.config.ts` terugzetten naar `/` en de Pages-workflow vervangen door een deploy naar de VPS.
- **VPS en privacy**: de hoster verwerkt bezoekers- en formulierdata. Kies een hoster in de EU, sluit een verwerkersovereenkomst af en vermeld de hoster in het privacybeleid. Webserver- en applicatielogs bevatten IP-adressen en mogelijk formulierinhoud: leg een bewaartermijn vast (logrotatie) en log geen formulierinhoud.

Uit het zoutbestelformulier (`/zout-bestellen`, oktober 2026):

- **Bevestigingsmail** aan de klant staat in `server/Services/SaltOrderService.cs`. De tekst laten bevestigen door de PO.
- **Ontvangstadressen** `zout@waterzacht.nl` en `info@waterzacht.nl` (`server/appsettings.json`, sectie `Mail`): het zout-adres was een voorbeeld van de PO. Laten bevestigen en het adres aanmaken.
- **Verwachte ophaaldatum**: de PO wil die tonen bij afhalen, maar de levertijd is onbekend. Zet `pickupLeadWorkdays` in `src/Config/saltOrder.ts` zodra die bekend is; tot dan staat er "Wij laten u weten wanneer uw zout klaarstaat". Ook openingstijden/afspraak voor afhalen ontbreken.
- **Formulier**: link naar het privacybeleid ontbreekt (zelfde punt als het offerteformulier). Adresvelden zijn alleen verplicht bij bezorgen.
