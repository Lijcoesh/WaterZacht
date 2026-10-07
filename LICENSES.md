# Licenties van dependencies

Nagelopen in oktober 2026. Herkomst van afbeeldingen en fonts: `src/Resources/README.md`.

## Frontend (npm)

In de bundle (`dependencies`): MIT, BSD-3-Clause (`hoist-non-react-statics`, `react-transition-group`), ISC en de fonts onder OFL-1.1. Bij elke build schrijft Vite de licentieteksten van alles wat in de bundle zit naar `dist/licenses.md` (`build.license` in `vite.config.ts`). Dat bestand gaat mee naar de VPS, zo staan de copyrightvermeldingen bij de code.

Alleen bij het bouwen (`devDependencies`, niet in de bundle): MIT, Apache-2.0, ISC, BSD, BlueOak-1.0.0, CC-BY-4.0 (`caniuse-lite`, alleen data) en MPL-2.0 (`lightningcss`, ongewijzigd gebruikt).

## Backend (NuGet)

In de API: `Microsoft.Extensions.*` (MIT) en Polly (BSD-3-Clause).

Alleen bij het bouwen en testen, niet in de publish:

- Analyzers: StyleCop en Roslynator (Apache-2.0), Nullable.Extended (MIT), SonarAnalyzer (Sonar Source-Available License 1.0: vrij te gebruiken, behalve in een product dat met SonarQube concurreert).
- Tests: xUnit en Castle.Core (Apache-2.0), Moq (BSD-3-Clause), Microsoft.NET.Test.Sdk (MIT).

Geen GPL of AGPL.
