# TODO

In de volgorde waarin het werk af moet. Details van juridische en inhoudelijke punten staan in `.claude/conventions/launch-checklist.md` ("Openstaand").

## Nu (zonder de PO)

### VPS
- [ ] Snapshot maken in het TransIP-paneel van de werkende situatie
- [ ] Automatische beveiligingsupdates controleren: `systemctl status unattended-upgrades` is *active*
- [ ] fail2ban installeren tegen het raden van wachtwoorden via SSH
- [ ] Uptime-monitor instellen (bv. UptimeRobot) op de site

### Code
- [ ] Naamsvermelding voor de Wikimedia-foto's in de vergelijkingsslider (CC BY-SA 3.0), of ze vervangen door eigen foto's
- [ ] Toegankelijkheid nalopen: alt-teksten, toetsenbordbediening, zichtbare focus, skip-link naar de inhoud
- [ ] Licenties van de npm- en NuGet-dependencies nalopen
- [ ] Concept-privacyverklaring schrijven, met open punten voor de PO

## Thuis
- [ ] SSH-key van de thuiscomputer toevoegen op de VPS
- [ ] Inloggen met een wachtwoord uitzetten (`PasswordAuthentication no`)

## Gesprek met de PO
- [ ] Domein bij YourHosting: DNS-toegang, A/AAAA naar de VPS, MX-records laten staan
- [ ] Brevo: account op naam van Water Zacht, domein `waterzacht.nl` verifiëren, afzenderadres kiezen
- [ ] Ontvangstadressen `info@` en `zout@waterzacht.nl` bevestigen
- [ ] Gegevens en teksten: KvK- en btw-nummer, privacyverklaring, garantie- en leveringsvoorwaarden, levertijd zout en afhaaltijden
- [ ] Claims laten onderbouwen, foto's bevestigen (Martin, toestemming Kinetico), logo
- [ ] Verwerkersovereenkomst (hosting door de ontwikkelaar, Brevo)
- [ ] Teksten van de bevestigingsmail en het blok over Loodgietersbedrijf Martin van Wingerden laten bevestigen

## Na het gesprek (livegang)
- [ ] Domein in `deploy/waterzacht.caddy` zetten, kopiëren naar de VPS en Caddy herladen
- [ ] Brevo-key en afzender van Water Zacht in `/etc/waterzacht/api.env`, de `Mail__`-testregels eruit
- [ ] `noindex` uit `index.html` halen
- [ ] GitHub Pages-workflow (`deploy.yml`) en `BASE_PATH` opruimen
- [ ] Launch-checklist volledig nalopen
