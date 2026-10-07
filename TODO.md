# TODO

In de volgorde waarin het werk af moet. Details van juridische en inhoudelijke punten staan in `.claude/conventions/launch-checklist.md` ("Openstaand").

## Nu (zonder de PO)

### Onderzoeken
- [ ] Hoe werkt het met mailen? Hij heeft zijn eigen domein "Waterzacht.nl" op YourHosting, zit hier ook het mail adres bij inbegrepen. Kan ik dit ook overzetten naar TransIP als ik het domein van YourHosting overzet naar TransIP?

### VPS
- [ ] fail2ban installeren tegen het raden van wachtwoorden via SSH

### Code
- [ ] Naamsvermelding voor de Wikimedia-foto's in de vergelijkingsslider (CC BY-SA 3.0), of ze vervangen door eigen foto's
- [ ] Toegankelijkheid nalopen: alt-teksten, toetsenbordbediening, zichtbare focus, skip-link naar de inhoud
- [ ] Licenties van de npm- en NuGet-dependencies nalopen
- [ ] Concept-privacyverklaring schrijven, met open punten voor de PO

## Thuis
- [ ] SSH-key van de thuiscomputer toevoegen op de VPS
- [ ] Inloggen met een wachtwoord uitzetten (`PasswordAuthentication no`)

## Gesprek met de PO
- [ ] Alle punten in `Gesprek-PO.md` doorlopen

## Na het gesprek (livegang)
- [ ] Domein in `deploy/waterzacht.caddy` zetten, kopiëren naar de VPS en Caddy herladen
- [ ] Brevo-key en afzender van Water Zacht in `/etc/waterzacht/api.env`, de `Mail__`-testregels eruit
- [ ] De monitors in UptimeRobot van het IP-adres naar `https://waterzacht.nl` zetten
- [ ] `noindex` uit `index.html` halen
- [ ] GitHub Pages-workflow (`deploy.yml`) en `BASE_PATH` opruimen
- [ ] Launch-checklist volledig nalopen
