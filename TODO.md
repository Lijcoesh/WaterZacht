# TODO

In de volgorde waarin het werk af moet. Details van juridische en inhoudelijke punten staan in `.claude/conventions/launch-checklist.md` ("Openstaand").

## Na het gesprek (livegang)
- [ ] Antwoorden van de PO verwerken in `/privacy`: alle gele open punten en de conceptmelding weg, datum invullen
- [ ] Vóór de domeinverhuizing alle DNS-records bij YourHosting overnemen in TransIP (MX, SPF, autodiscover). Gaat de mail ook mee: eerst mailboxen bij TransIP aanmaken en de mail overzetten, pas daarna de MX omzetten en YourHosting opzeggen
- [ ] Domein in `deploy/waterzacht.caddy` zetten, kopiëren naar de VPS en Caddy herladen
- [ ] Brevo-key en afzender van Water Zacht in `/etc/waterzacht/api.env`, de `Mail__`-testregels eruit
- [ ] De monitors in UptimeRobot van het IP-adres naar `https://waterzacht.nl` zetten
- [ ] `noindex` uit `index.html` halen
- [ ] GitHub Pages-workflow (`deploy.yml`) en `BASE_PATH` opruimen
- [ ] Launch-checklist volledig nalopen
