# TODO

In de volgorde waarin het werk af moet. Details van juridische en inhoudelijke punten staan in `.claude/conventions/launch-checklist.md` ("Openstaand").

## Nu (zonder de PO)

### Code
- [ ] Naamsvermelding voor de Wikimedia-foto's in de vergelijkingsslider (CC BY-SA 3.0), of ze vervangen door eigen foto's
- [ ] Toegankelijkheid nalopen: alt-teksten, toetsenbordbediening, zichtbare focus, skip-link naar de inhoud
- [ ] Licenties van de npm- en NuGet-dependencies nalopen
- [ ] Concept-privacyverklaring schrijven, met open punten voor de PO

## Thuis
- [ ] SSH-key van de thuiscomputer toevoegen op de VPS
- [ ] Inloggen met een wachtwoord uitzetten (`PasswordAuthentication no`)

## Na het gesprek (livegang)
- [ ] Vóór de domeinverhuizing alle DNS-records bij YourHosting overnemen in TransIP (MX, SPF, autodiscover). Gaat de mail ook mee: eerst mailboxen bij TransIP aanmaken en de mail overzetten, pas daarna de MX omzetten en YourHosting opzeggen
- [ ] Domein in `deploy/waterzacht.caddy` zetten, kopiëren naar de VPS en Caddy herladen
- [ ] Brevo-key en afzender van Water Zacht in `/etc/waterzacht/api.env`, de `Mail__`-testregels eruit
- [ ] De monitors in UptimeRobot van het IP-adres naar `https://waterzacht.nl` zetten
- [ ] `noindex` uit `index.html` halen
- [ ] GitHub Pages-workflow (`deploy.yml`) en `BASE_PATH` opruimen
- [ ] Launch-checklist volledig nalopen
