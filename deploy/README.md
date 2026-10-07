# Deploy naar de VPS

De site en de API draaien op een eigen VPS (TransIP, Ubuntu 26.04) waar ook andere klantsites op staan. Caddy serveert de site en stuurt `/api` door naar de API. De API draait als systemd-service. Bij elke push naar `main` bouwt GitHub Actions (`.github/workflows/deploy-vps.yml`) de site en de API en zet ze met rsync op de VPS.

| Op de VPS | Wat |
|---|---|
| `/var/www/waterzacht/site/` | gebouwde frontend (`dist/`) |
| `/var/www/waterzacht/api/` | `dotnet publish` van `server/` |
| `/etc/waterzacht/api.env` | secrets voor de API, alleen leesbaar voor root |
| `/etc/caddy/sites/waterzacht.caddy` | Caddy-config van deze site ([waterzacht.caddy](waterzacht.caddy)) |
| `/etc/systemd/system/waterzacht-api.service` | de API-service ([waterzacht-api.service](waterzacht-api.service)) |

Gebruikers: `deploy` (GitHub logt hiermee in en mag alleen deze service herstarten) en `waterzacht` (draait de API, kan niet inloggen).

## Eenmalig instellen

Eenmalig voor de hele VPS: `sudo apt install -y aspnetcore-runtime-10.0 caddy rsync`, de firewall (`ufw allow OpenSSH`, `80/tcp`, `443`), de `deploy`-gebruiker met een deploy-key, en [Caddyfile](Caddyfile) als `/etc/caddy/Caddyfile`.

fail2ban blokkeert een IP-adres een uur na 5 mislukte SSH-logins binnen 10 minuten: `sudo apt install -y fail2ban`, dan in `/etc/fail2ban/jail.local`:
```
[sshd]
enabled = true
backend = systemd
maxretry = 5
findtime = 10m
bantime = 1h
```
en `sudo systemctl enable --now fail2ban`. Controleren met `sudo fail2ban-client status sshd`. Jezelf buitengesloten? Log in via de console in het TransIP-paneel en doe `sudo fail2ban-client set sshd unbanip <IP>`.

Per site (hier `waterzacht`, poort 5080; een volgende site krijgt een eigen naam en poort):

1. Gebruiker en mappen:
   ```
   sudo useradd --system --no-create-home --shell /usr/sbin/nologin waterzacht
   sudo mkdir -p /var/www/waterzacht/site /var/www/waterzacht/api /etc/waterzacht
   sudo chown -R deploy:deploy /var/www/waterzacht
   ```
2. Secrets in `/etc/waterzacht/api.env` (`sudo nano`, daarna `sudo chmod 600`):
   ```
   Brevo__ApiKey=...
   Brevo__SenderEmail=...
   ```
3. Config: kopieer `waterzacht.caddy` naar `/etc/caddy/sites/` en `waterzacht-api.service` naar `/etc/systemd/system/`, dan:
   ```
   sudo systemctl daemon-reload
   sudo systemctl enable waterzacht-api
   sudo systemctl reload caddy
   ```
4. `deploy` mag de service herstarten:
   ```
   echo 'deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart waterzacht-api' | sudo tee /etc/sudoers.d/deploy-waterzacht
   sudo chmod 440 /etc/sudoers.d/deploy-waterzacht
   ```
5. GitHub-secrets (repo → Settings → Secrets and variables → Actions): `VPS_HOST` (het IP), `VPS_SSH_KEY` (de privé deploy-key) en `VPS_KNOWN_HOSTS` (uitvoer van `ssh-keyscan <IP>`).

Wijzig je later `waterzacht.caddy` of de service, kopieer hem dan opnieuw en doe `sudo systemctl reload caddy` of `sudo systemctl daemon-reload && sudo systemctl restart waterzacht-api`. De workflow kopieert alleen de site en de API.

## Controleren

- API-status: `systemctl status waterzacht-api`; logs: `journalctl -u waterzacht-api -n 50`
- Caddy: `systemctl status caddy`; config testen: `caddy validate --config /etc/caddy/Caddyfile`
- Van buitenaf: `/api/health` geeft `Healthy` als de API draait. UptimeRobot controleert dat en de site zelf elke 5 minuten. Gebruik geen `/health`: zonder `/api` ervoor geeft Caddy `index.html` terug, met een 200, ook als de API plat ligt.
